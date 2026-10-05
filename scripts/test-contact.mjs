import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('src/app/api/contact/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
let calls = [];
let providerError = false;
const context = {
  exports: {}, Response, TextEncoder, URL,
  process: { env: { RESEND_API_KEY: 'test-only-not-a-real-key' } },
  console: { error() {} },
  require(name) {
    assert.equal(name, 'resend');
    return { Resend: class {
      emails = { send: async payload => {
        calls.push(payload);
        return providerError ? { error: { name: 'test-provider-error' } } : { error: null };
      } };
    } };
  },
};
vm.runInNewContext(source, context);
const valid = { name: '  Prueba   Portafolio  ', email: 'manuelcaicedo52@gmail.com', subject: 'Prueba de contacto', message: '<script>texto seguro en correo plano</script>', website: '' };
const post = body => context.exports.POST(new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) }));
(async () => {
  for (const body of [{}, { ...valid, email: 'invalid' }, { ...valid, message: 'corto' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, name: 123 }]) {
    assert.equal((await post(body)).status, 400);
  }
  assert.equal(calls.length, 0);
  assert.equal((await post({ ...valid, website: 'bot' })).status, 200);
  assert.equal(calls.length, 0);
  assert.equal((await post(valid)).status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].replyTo, valid.email);
  assert.equal(calls[0].to, 'manuelcaicedo52@gmail.com');
  assert.equal(calls[0].html, undefined);
  assert.ok(calls[0].text.includes('Nombre: Prueba Portafolio'));
  providerError = true;
  const errorResponse = await post(valid);
  assert.equal(errorResponse.status, 500);
  assert.ok(!(await errorResponse.text()).includes('test-provider-error'));
  delete context.process.env.RESEND_API_KEY;
  assert.equal((await post(valid)).status, 500);
  const clientSource = ts.transpileModule(fs.readFileSync('src/components/contact/ContactForm.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  let requests = 0, resets = 0, complete;
  const feedback = [];
  const client = { exports: {}, AbortSignal, JSON, Object,
    FormData: class { *[Symbol.iterator]() { yield ['name', 'Prueba']; } },
    fetch: () => { requests++; return new Promise(resolve => { complete = resolve; }); },
    require(name) {
      if (name === 'react') return { useRef: value => ({ current: value }), useState: value => [value, next => feedback.push(next)] };
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      throw new Error(name);
    },
  };
  vm.runInNewContext(clientSource, client);
  const form = client.exports.default();
  const event = { preventDefault() {}, currentTarget: { reset() { resets++; } } };
  const first = form.props.onSubmit(event);
  await form.props.onSubmit(event);
  assert.equal(requests, 1);
  complete({ ok: true, json: async () => ({ message: 'ok' }) });
  await first;
  assert.equal(resets, 1);
  assert.ok(feedback.includes('Mensaje enviado correctamente.'));
  const retry = form.props.onSubmit(event);
  complete({ ok: false, status: 500, json: async () => ({ message: 'internal' }) });
  await retry;
  assert.equal(resets, 1);
  assert.ok(feedback.includes('No se pudo enviar el mensaje. Inténtalo nuevamente.'));
  console.log('PASS: empty/invalid/limits/types, honeypot without sending, valid delivery payload, safe provider error and missing configuration.');
  console.log('PASS: repeated submit produces one request, success resets fields, error preserves fields and enables retry.');
})().catch(error => { console.error(error); process.exitCode = 1; });
