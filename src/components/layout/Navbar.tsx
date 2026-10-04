"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_HREF, NAV_LINKS } from "@/utils/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    const desktop = window.matchMedia("(min-width: 64rem)");
    function closeOnDesktop() {
      if (desktop.matches) setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <header className="site-header">
      <nav
        ref={navRef}
        className="site-container navbar"
        aria-label="Navegación principal"
        onKeyDown={(event) => {
          if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            toggleRef.current?.focus();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
        }}
      >
        <a className="brand" href="#inicio" onClick={() => setIsOpen(false)}>
          Manuel Caicedo<span aria-hidden="true">.</span>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="navigation-links"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{isOpen ? "Cerrar" : "Menú"}</span>
          <span className="menu-icon" data-open={isOpen} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <ul id="navigation-links" className="nav-links" data-open={isOpen}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a className="nav-link" href={href} onClick={() => setIsOpen(false)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a className="button nav-contact" href={CONTACT_HREF} onClick={() => setIsOpen(false)}>
              Hablemos <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
