import { Resend } from "resend";

export const runtime = "nodejs";
const failure = "No se pudo enviar el mensaje. Inténtalo nuevamente.";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return Response.json({ message: failure }, { status: 403 });
    }
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 24000) {
      return Response.json({ message: "El mensaje es demasiado largo." }, { status: 400 });
    }
    let body: unknown;
    try { body = JSON.parse(raw); } catch {
      return Response.json({ message: "Los datos no son válidos." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ message: "Los datos no son válidos." }, { status: 400 });
    }
    const fields = body as Record<string, unknown>;
    if (typeof fields.website !== "undefined" && typeof fields.website !== "string") {
      return Response.json({ message: "Los datos no son válidos." }, { status: 400 });
    }
    if (typeof fields.website === "string" && fields.website.trim()) {
      return Response.json({ message: "Mensaje enviado correctamente." });
    }
    if (!["name", "email", "subject", "message"].every(key => typeof fields[key] === "string")) {
      return Response.json({ message: "Completa todos los campos." }, { status: 400 });
    }
    const name = (fields.name as string).trim().replace(/\s+/g, " ");
    const email = (fields.email as string).trim();
    const subject = (fields.subject as string).trim().replace(/\s+/g, " ");
    const message = (fields.message as string).trim();
    if (name.length < 2 || name.length > 100 || subject.length < 3 || subject.length > 150 ||
        email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
        message.length < 10 || message.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(name + subject + message)) {
      return Response.json({ message: "Revisa los campos: nombre (2–100), asunto (3–150), mensaje (10–5000 caracteres) y correo válido." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact: missing server configuration");
      return Response.json({ message: failure }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Portafolio Manuel <onboarding@resend.dev>",
      to: "manuelcaicedo52@gmail.com",
      replyTo: email,
      subject: `Portafolio: ${subject}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
    });
    if (error) {
      console.error("Contact: email provider rejected the request", error.name);
      return Response.json({ message: failure }, { status: 500 });
    }
    return Response.json({ message: "Mensaje enviado correctamente." });
  } catch {
    console.error("Contact: unexpected delivery failure");
    return Response.json({ message: failure }, { status: 500 });
  }
}
