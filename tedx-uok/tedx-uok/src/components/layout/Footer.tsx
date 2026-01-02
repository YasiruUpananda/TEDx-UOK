import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "Speakers", href: "/speakers" },
    { name: "FAQ", href: "/faq" },
    { name: "Agenda", href: "/agenda" },
    { name: "Venue", href: "/venue" },
    { name: "Team", href: "/team" },
    { name: "Press & Media", href: "/media" },
    { name: "Volunteering", href: "/volunteer" },
  ],
  about: [
    { name: "About TED", href: "/about#ted" },
    { name: "About TEDx", href: "/about#tedx" },
    { name: "About TEDxUoK", href: "/about#tedxuok" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Code of Conduct", href: "/code-of-conduct" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Licensing", href: "/licensing" },
    {
      name: "TEDx Rules",
      href: "https://www.ted.com/about/our-organization/our-policies-terms/tedx-rules",
      external: true,
    },
  ],
};

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com", label: "X (Twitter)" },

];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1 font-extrabold text-2xl tracking-tight"
            >
              <span className="relative inline-block text-[#EB0028]">
                <span>TED</span>
                <span className="absolute top-[-10%]">x</span>
                <span className="opacity-0">x</span>
              </span>
              <span className="text-white">UoK</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed text-left">
              Ideas worth spreading. An independently organized TEDx event at
              the University of Kelaniya.
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 bg-white/5 rounded-full text-white hover:bg-[#EB0028] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-black transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4 items-start text-left">
            <h4 className="text-sm font-extrabold text-white mb-8 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[var(--tedx-red)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col space-y-4 items-start text-left">
            <h4 className="text-sm font-extrabold text-white mb-8 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[var(--tedx-red)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col space-y-4 items-start text-left">
            <h4 className="text-sm font-extrabold text-white mb-8 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-[var(--tedx-red)] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-[var(--tedx-red)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center text-center gap-2">
          <p className="text-sm text-white/50">
            © {currentYear}{" "}
            <span className="font-extrabold">
              <span className="relative inline-block">
                <span>TED</span>
                <span className="absolute top-[-20%]">x</span>
                <span className="opacity-0">x</span>
              </span>
              UoK
            </span>
            .
          </p>
          <p className="text-sm text-white/50">
            This independent{" "}
            <span className="relative inline-block font-extrabold">
              <span>TED</span>
              <span className="absolute top-[-10%]">x</span>
              <span className="opacity-0">x</span>
            </span>{" "}
            event is operated under license from TED.
          </p>
        </div>
      </div>
    </footer>
  );
}