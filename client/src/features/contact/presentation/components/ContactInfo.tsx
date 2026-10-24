import { memo } from 'react';
import type { ContactChannels } from '../../domain/entities/Contact';

interface ContactInfoProps {
  channels: ContactChannels;
}

export const ContactInfo = memo<ContactInfoProps>(({ channels }) => {
  const rows = [
    { title: channels.callTitle, label: channels.phone, href: channels.phoneHref },
    { title: channels.writeTitle, label: channels.email, href: channels.emailHref },
    { title: channels.whatsappTitle, label: channels.whatsappAction, href: channels.whatsapp, external: true },
  ];

  return (
    <div className="lg:pt-[0.875rem]">
      <h2 className="text-[1.6875rem] leading-[1.6875rem] text-ink tracking-tight">{channels.title}</h2>
      <p className="mt-[0.875rem] text-[0.875rem] leading-[0.875rem] text-muted">{channels.subtitle}</p>

      <ul className="mt-[0.875rem]">
        {rows.map((row) => (
          <li key={row.title} className="border-b border-line pt-[1.6875rem] pb-[0.875rem]">
            <h3 className="text-[1.0625rem] leading-[1.0625rem] text-ink">{row.title}</h3>
            <a
              href={row.href}
              className="mt-[0.8125rem] inline-block text-[0.875rem] leading-[0.875rem] text-olive hover:text-olive-dark hover:underline underline-offset-4"
              {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {row.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-[0.75rem] text-muted">{channels.area}</p>
    </div>
  );
});
