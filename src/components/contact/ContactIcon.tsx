type ContactIconProps = { name: string };

export default function ContactIcon({ name }: ContactIconProps) {
  return (
    <svg className="contact-channel-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {name === "WhatsApp" && <>
        <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.6-4.8a8.5 8.5 0 1 1 15.9-4.4Z" />
        <path d="m8 7 1.5 3-1 1c1 2 2.5 3.5 4.5 4.5l1-1 3 1.5c-.4 1.5-1.5 2-2.5 1.7-4-1-7.7-4.7-8.7-8.7C5.5 8 6.5 7.1 8 7Z" />
      </>}
      {name === "Correo" && <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>}
      {name === "LinkedIn" && <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
        <path d="M7.5 11v6M11.5 17v-6m0 2c0-3 5-3 5 0v4" />
      </>}
      {name === "GitHub" && <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />}
    </svg>
  );
}
