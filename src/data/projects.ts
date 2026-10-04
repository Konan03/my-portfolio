export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: readonly string[];
};

export const projects: readonly Project[] = [
  {
    id: "camino-al-progreso",
    name: "Camino al Progreso",
    category: "PLATAFORMA DE GESTIÓN Y ANÁLISIS",
    description:
      "Sistema para gestionar colegios, encuestas y resultados de jornadas vocacionales, con herramientas de consulta, reportes y visualización de datos.",
    technologies: ["Spring Boot", "Vue", "PostgreSQL"],
  },
  {
    id: "tienda-universitaria-unibague",
    name: "Tienda Universitaria Unibagué",
    category: "PROYECTO UNIVERSITARIO",
    description:
      "Desarrollo de interfaz para una solución de gestión de la tienda universitaria, en colaboración con un equipo de desarrollo.",
    technologies: ["Vue", "Vuetify", "Spring Boot", "PostgreSQL"],
  },
];
