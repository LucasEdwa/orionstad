const footerLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
    { href: "https://www.facebook.com/orionstad", label: "Facebook" },
    { href: "https://www.instagram.com/orionstad", label: "Instagram" },
    { href: "https://www.linkedin.com/company/orionstad", label: "LinkedIn" },
];

export const Footer = () => (
    <footer className=" text-black p-4 text-center border-t border-gray-300 bg-white">
        <p className="text-xl">
            © 2025 Orion Städ. All rights reserved.
        </p>

        <div className="mt-4 flex justify-around">
            <ul className="flex flex-col items-center gap-1 my-2">
                {footerLinks.map(link => (
                    <li key={link.href}>
                        <a href={link.href} className="text-blue-400 hover:underline">
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex justify-center gap-4">
                {socialLinks.map((link) => (
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
        </div>
<p className="text-xl mt-2">
      Orion AB, Södervägen 18A, 14137 Huddinge, Sweden, Organisationsnummer 559468-1479
    </p>
    </footer>
);