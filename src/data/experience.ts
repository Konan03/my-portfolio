export type Experience = {
  id: string;
  period: string;
  organization: string;
  role: string;
  description: string;
};

export const experience: readonly Experience[] = [
  {
    id: "docente-universidad-ibague",
    period: "Febrero 2026 — Actualidad",
    organization: "Universidad de Ibagué",
    role: "Docente · Ingeniería de Sistemas",
    description: "Acompañamiento y formación de estudiantes en áreas relacionadas con programación, diseño de soluciones y desarrollo de software.",
  },
  {
    id: "desarrollo-freelance",
    period: "Octubre 2025 — Agosto 2026",
    organization: "Valor Para Crecer",
    role: "Desarrollador Freelance",
    description: "Desarrollo de una aplicacion de gestion de información para la empresa Valor Para Crecer, utilizando tecnologías web, con enfoque en la experiencia del usuario y la eficiencia del sistema.",
  },
  {
    id: "desarrollador-training-magic-solutions",
    period: "Agosto 2024 — Enero 2025",
    organization: "Magic Solutions",
    role: "Desarrollador en Training",
    description: "Participación en el desarrollo de soluciones de software, trabajando en funcionalidades web y móviles e integración con servicios backend.",
  },
  {
    id: "proyecto-de-grado",
    period: "Junio 2024 — Noviembre 2024",
    organization: "Universidad de Ibagué",
    role: "Tienda Universitaria · Proyecto de grado",
    description: "Participación en el desarrollo de una solución de gestión para la tienda universitaria, con énfasis en la construcción de la interfaz y su integración con el sistema.",
  },
  {
    id: "monitoria-universidad-ibague",
    period: "Agosto 2022 — Noviembre 2024",
    organization: "Universidad de Ibagué",
    role: "Monitor · Ingeniería de Sistemas",
    description: "Apoyo académico a estudiantes en el área de programación y desarrollo de software.",
  }
];
