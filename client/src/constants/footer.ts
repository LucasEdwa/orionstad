export type FooterLink = {
  href: string;
  label: string;
  icon?: string; // Add icon property
};

export type FooterContent = {
  copyright: string;
  address: string;
  links: FooterLink[];
  social: FooterLink[];
};

export const FOOTER_CONTENT: FooterContent = {
  copyright: "© 2025 Orion Städ. All rights reserved.",
  address: "Orion AB, Södervägen 18A, 14137 Huddinge, Sweden, Organisationsnummer 559468-1479",
  links: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/contact", label: "Contact Us" },
  ],
  social: [
    { href: "https://www.facebook.com/people/Orion-Städ/pfbid032LTfFTwtW1M1Rjx4h1CSb3JXGQTonuXZyKpkZiu9j3ZXPUF6tc5KKqpVikBz5SDHl/", label: "Facebook", icon: "FaFacebook" },
    { href: "https://www.instagram.com/orion.stad/", label: "Instagram", icon: "FaInstagram" },
    { href: "https://www.linkedin.com/in/orion-städ-819995308/?originalSubdomain=se", label: "LinkedIn", icon: "FaLinkedin" },
    { href: "https://wa.me/message/I6GQY6OWYB5FH1", label: "WhatsApp", icon: "FaWhatsapp" }
  ],
};
