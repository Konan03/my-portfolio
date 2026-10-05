import { contactChannels } from "@/data/contact";
import ContactForm from "@/components/contact/ContactForm";
import ContactIcon from "@/components/contact/ContactIcon";

export default function Contact() {
  return (
    <section id="contacto" className="contact" aria-labelledby="contact-title">
      <div className="site-container contact-layout">
        <header className="contact-heading">
          <p className="section-label contact-label">CONTACTO</p>
          <h2 id="contact-title">¿Tienes un proyecto <span>en mente?</span></h2>
        </header>
        <div className="contact-details">
          <div className="contact-alternatives">
          <p className="contact-description">
            Cuéntame qué necesitas construir, qué problema quieres resolver o qué
            idea tienes en mente. Podemos conversar y definir los siguientes pasos.
          </p>
          <div className="contact-channels">
            <ul aria-label="Medios de contacto" role="list">
              {contactChannels.map((channel) => (
                <li key={channel.name}>
                  <a
                    className="contact-channel"
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                  >
                    <span className="contact-channel-text">
                      <span className="contact-channel-name">
                        <ContactIcon name={channel.name} />
                        {channel.name}
                      </span>
                      <span className="contact-channel-value">{channel.value}</span>
                    </span>
                    <span className="contact-channel-arrow" aria-hidden="true">{channel.external ? "↗" : "→"}</span>
                    {channel.external && <span className="sr-only"> (abre en una nueva pestaña)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
