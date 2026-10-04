import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="servicios" className="services" aria-labelledby="services-title">
      <div className="site-container">
        <header className="services-heading">
          <div>
            <p className="section-label services-label">SERVICIOS</p>
            <h2 id="services-title">Cómo puedo ayudarte.</h2>
          </div>
          <p className="services-intro">
            Diseño y desarrollo soluciones digitales adaptadas a las necesidades de
            cada proyecto, desde presencia web hasta sistemas que apoyan procesos reales.
          </p>
        </header>
        <ol className="services-list" role="list">
          {services.map((service, index) => (
            <li key={service.id} className="service-card">
              <p className="service-index">
                <span className="service-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-category">
                  <span aria-hidden="true">/ </span>{service.category}
                </span>
              </p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
