import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manuel Caicedo | Ingeniero de Sistemas",
  description:
    "Desarrollo sitios web, aplicaciones y sistemas a medida para personas, emprendimientos y organizaciones.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
