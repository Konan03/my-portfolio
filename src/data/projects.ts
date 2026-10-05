import type { StaticImageData } from "next/image";
import unitiendaImage from "@/data/img/unitienda-img.png";
import vpcImage from "@/data/img/vpc-img.png";

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: readonly string[];
  image?: { src: StaticImageData; alt: string };
  externalLink?: { href: string; label: string };
};

export const projects: readonly Project[] = [
  {
    id: "valor-para-crecer",
    name: "Valor Para Crecer",
    category: "PLATAFORMA DE GESTIÓN Y ANÁLISIS",
    description:
      "Sistema para gestionar colegios, encuestas y resultados de jornadas vocacionales, con herramientas de consulta, reportes y visualización de datos.",
    technologies: ["Spring Boot", "Vue", "PostgreSQL"],
    image: {
      src: vpcImage,
      alt: "Pantalla de inicio de sesión del sistema de gestión Valor Para Crecer.",
    },
    externalLink: {
      href: "https://vpc-sdg.vercel.app/login",
      label: "Ver proyecto",
    },
  },
  {
    id: "tienda-universitaria-unibague",
    name: "Tienda Universitaria Unibagué",
    category: "PROYECTO UNIVERSITARIO",
    description:
      "Desarrollo frontend de una solución para la gestión de la tienda universitaria, realizado en colaboración con un equipo de desarrollo.",
    technologies: ["Vue", "Vuetify"],
    image: {
      src: unitiendaImage,
      alt: "Página de inicio de la tienda universitaria con navegación, buscador y catálogo de productos.",
    },
    externalLink: {
      href: "https://unitienda-front-61pmv8sqw-konan03s-projects.vercel.app/",
      label: "Ver frontend",
    },
  },
];
