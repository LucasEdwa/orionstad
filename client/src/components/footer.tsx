import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  const { t } = useTranslation("footer");
  const links = t("links", { returnObjects: true }) as Array<{ label: string; href: string }>;
  const social = t("social", { returnObjects: true }) as Array<{ label: string; href: string; icon: string }>;
  const copyright = t("copyright");
  const address = t("address");
  const companyInfo = t("companyInfo", { returnObjects: true }) as { 
    name: string; 
    tagline: string; 
    description: string; 
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
      {/* Reviews Widget */}
      <div className="bg-white/10 backdrop-blur-sm py-3">
        <div className="max-w-7xl mx-auto px-4">
          <iframe
            src="https://widget.reco.se/v2/venues/5868926/horizontal/small?inverted=false&border=true"
            title="Orion Städ AB - Omdömen på Reco"
            height="27"
            className="w-full border-0 block overflow-hidden bg-transparent rounded"
            data-reactroot
          ></iframe>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-3">{companyInfo.name}</h3>
            <p className="text-purple-200 text-lg mb-4 italic">{companyInfo.tagline}</p>
            <p className="text-purple-100 leading-relaxed mb-6">{companyInfo.description}</p>
            <div className="text-sm text-purple-200 leading-relaxed">
              {address}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-200">Quick Links</h4>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-purple-100 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-200">Connect With Us</h4>
            <div className="space-y-3">
              {social.map(link => {
                let Icon;
                switch (link.icon) {
                  case "FaFacebook":
                    Icon = FaFacebook;
                    break;
                  case "FaInstagram":
                    Icon = FaInstagram;
                    break;
                  case "FaLinkedin":
                    Icon = FaLinkedin;
                    break;
                  case "FaWhatsapp":
                    Icon = FaWhatsapp;
                    break;
                  default:
                    Icon = null;
                }
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center gap-3 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && (
                      <Icon className="text-xl group-hover:scale-110 transition-transform duration-200" />
                    )}
                    <span className="group-hover:underline">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-600 mt-12 pt-8 text-center">
          <p className="text-purple-200 text-sm">
            {copyright}
          </p>
          <p className="text-purple-300 text-xs mt-2">
            Transforming homes and lives through the art of cleaning
          </p>
        </div>
      </div>
    </footer>
  );
};
