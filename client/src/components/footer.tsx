import { FOOTER_CONTENT } from "../constants/footer";

export const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p className="text-sm">
      {FOOTER_CONTENT.copyright}
    </p>
    <ul className="flex flex-col items-center gap-1 my-2">
      {FOOTER_CONTENT.links.map(link => (
        <li key={link.href}>
          <a href={link.href} className="text-blue-400 hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
    <div className="mt-4 flex justify-center gap-4">
      {FOOTER_CONTENT.social.map(link => (
        <a
          key={link.href}
          href={link.href}
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
    <p className="text-xl mt-2">
      {FOOTER_CONTENT.address}
    </p>
  </footer>
);