import { FOOTER_CONTENT } from "../constants/footer";

export const Footer = () => (
  <footer className="  text-white p-4 text-center border-t border-gray-200">
    <iframe
      src="https://widget.reco.se/v2/venues/5868926/horizontal/small?inverted=false&border=true"
      title="Orion Städ AB - Omdömen på Reco"
      height="27"
      style={{
        width: "100%",
        border: 0,
        display: "block",
        overflow: "hidden"
      }}
      data-reactroot
    ></iframe>

    <p className="text-sm text-black">
      {FOOTER_CONTENT.copyright}
    </p>
   <div className="flex justify-around space-x-4 mt-2">
     <ul className="flex flex-col items-center gap-1 my-2">
      {FOOTER_CONTENT.links.map(link => (
        <li key={link.href}>
          <a href={link.href} className="text-black hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
    <div className="mt-4 flex flex-col justify-center gap-4">
      {FOOTER_CONTENT.social.map(link => (
        <a
          key={link.href}
          href={link.href}
          className="text-black hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
    </div>
    
    <p className="text-xl mt-2 text-black">
      {FOOTER_CONTENT.address}
    </p>
  </footer>
);