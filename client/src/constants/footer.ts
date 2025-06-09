export type FooterLink = {
  href: string;
  label: string;
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
    { href: "https://www.facebook.com/orionstad", label: "Facebook" },
    { href: "https://www.instagram.com/orionstad", label: "Instagram" },
    { href: "https://www.linkedin.com/company/orionstad", label: "LinkedIn" },
  ],
};
