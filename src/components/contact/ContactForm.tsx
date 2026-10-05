"use client";

import { useRef, useState, type FormEvent } from "react";

type ContactResponse = { message: string };
type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setFeedback("Enviando...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(20000),
      });
      const result: ContactResponse = await response.json();
      if (!response.ok) {
        setStatus("error");
        setFeedback(response.status === 400 ? result.message : "No se pudo enviar el mensaje. Inténtalo nuevamente.");
        return;
      }
      form.reset();
      setStatus("success");
      setFeedback("Mensaje enviado correctamente.");
    } catch {
      setStatus("error");
      setFeedback("No se pudo enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-labelledby="contact-form-title" aria-busy={status === "sending"}>
      <h3 id="contact-form-title">Escríbeme directamente.</h3>
      <fieldset disabled={status === "sending"}>
        <div className="contact-form-fields">
          <div>
            <label htmlFor="contact-name">Nombre</label>
            <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
          </div>
          <div>
            <label htmlFor="contact-email">Correo</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          </div>
          <div className="contact-form-wide">
            <label htmlFor="contact-subject">Asunto</label>
            <input id="contact-subject" name="subject" required minLength={3} maxLength={150} />
          </div>
          <div className="contact-form-wide">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={5000} aria-describedby="contact-message-hint" />
            <p id="contact-message-hint" className="contact-form-hint">Entre 10 y 5000 caracteres.</p>
          </div>
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Deja este campo vacío</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="button button-primary contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </fieldset>
      <p className="contact-feedback" role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
    </form>
  );
}
