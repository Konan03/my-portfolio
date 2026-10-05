type ContactChannel = { name: string; value: string; href: string; external: boolean };

export const contactChannels: readonly ContactChannel[] = [
  { name: "WhatsApp", value: "+57 321 945 3514", href: "https://wa.me/573219453514", external: true },
  { name: "Correo", value: "manuelcaicedo52@gmail.com", href: "mailto:manuelcaicedo52@gmail.com", external: false },
  { name: "LinkedIn", value: "Jose Manuel Caicedo Perdomo", href: "https://www.linkedin.com/in/jose-manuel-caicedo-perdomo/", external: true },
  { name: "GitHub", value: "@Konan03", href: "https://github.com/Konan03", external: true },
];
