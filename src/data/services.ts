export type Service = {
  id: string;
  category: string;
  title: string;
  description: string;
};

export const services: readonly Service[] = [
  {
    id: "web",
    category: "WEB",
    title: "Sitios y aplicaciones web",
    description:
      "Desarrollo soluciones web para presentar negocios, ofrecer servicios y crear experiencias digitales claras, rápidas y adaptadas a cualquier dispositivo.",
  },
  {
    id: "backend",
    category: "BACKEND",
    title: "APIs e integraciones",
    description:
      "Construyo servicios que permiten conectar aplicaciones, intercambiar información y automatizar procesos entre diferentes sistemas.",
  },
  {
    id: "sistemas",
    category: "SISTEMAS",
    title: "Soluciones de software",
    description:
      "Desarrollo sistemas a medida para organizar información, optimizar procesos y resolver necesidades específicas de empresas, organizaciones y emprendimientos.",
  },
];
