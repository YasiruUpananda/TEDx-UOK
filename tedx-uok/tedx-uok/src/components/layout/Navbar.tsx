import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    {
      label: "About",
      // Parent is not a link itself, but a trigger
      subItems: [
        { to: '/theme', label: 'Theme 2026' },
        { to: '/about/ted', label: 'TED' },
        { to: '/about/tedx', label: 'TEDx' },
        { to: '/about/tedx-uok', label: 'TEDxUoK' },
      ]
    },
    { to: '/speakers', label: 'Speakers' },
    { to: '/agenda', label: 'Agenda' },
    { to: '/blog', label: 'Blog' },
    { to: '/partners', label: 'Partners' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // move focus to close button when menu opens
    closeBtnRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close dropdwon on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-1 font-extrabold text-lg tracking-tight">
              <span className="relative inline-block text-[#EB0028]">
                <span className="text-[#EB0028]">TED</span>
                <span className="text-[#EB0028] absolute top-[-20%]">x</span>
                <span className="opacity-0">x</span>
              </span>
              <span className="text-white">UoK</span>
            </a>
          </div>

          {/* Desktop */}
          {/* Center: Nav Links */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
            {links.map((l) => {
              if (l.subItems) {
                return (
                  <div
                    key={l.label}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(l.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 font-medium ${activeDropdown === l.label ? 'bg-white/10 text-white' : 'text-white hover:bg-white/10'}`}
                    >
                      {l.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === l.label ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 ${
                        activeDropdown === l.label ? "block" : "hidden"
                      }`}
                    >
                      <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg shadow-xl overflow-hidden py-2">
                        {l.subItems.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 ${
                                isActive ? "text-white bg-white/5" : ""
                              }`
                            }
                          >
                            {sub.label === "TED" ? (
                              <span className="font-extrabold">TED</span>
                            ) : sub.label === "TEDx" ? (
                              <span className="relative inline-block font-extrabold">
                                <span>TED</span>
                                <span className="absolute top-[-20%]">x</span>
                                <span className="opacity-0">x</span>
                              </span>
                            ) : sub.label === 'TEDxUoK' ? (
                              <span className="font-extrabold">
                                <span className="relative inline-block">
                                  <span>TED</span>
                                  <span className="absolute top-[-20%]">x</span>
                                  <span className="opacity-0">x</span>
                                </span>
                                <span>UoK</span>
                              </span>
                            ) : sub.label === 'Theme 2026' ? (
                              <span className="font-bold">{sub.label}</span>
                            ) : (
                              sub.label
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to!}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center">
            <Button variant="tedxPrimary" size="sm" asChild>
              <NavLink to="/register">Register Now</NavLink>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div id="mobile-menu-title" className="text-lg font-bold">
            Menu
          </div>
          <button
            aria-label="Close menu"
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 pt-2">
          <ul className="space-y-2">
            {links.map((l) => {
              if (l.subItems) {
                return (
                  <li key={l.label}>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === l.label ? null : l.label
                        )
                      }
                      className="flex items-center justify-between w-full px-3 py-2 rounded text-white hover:bg-white/5"
                    >
                      {l.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === l.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === l.label && (
                      <ul className="pl-4 mt-1 space-y-1 border-l border-white/10 ml-3">
                        {l.subItems.map((sub) => (
                          <li key={sub.to}>
                            <NavLink
                              to={sub.to}
                              onClick={() => setOpen(false)}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded text-sm text-white/80 ${
                                  isActive ? "text-white" : "hover:text-red-400"
                                }`
                              }
                            >
                              {sub.label === "TED" ? (
                                <span className="font-extrabold">TED</span>
                              ) : sub.label === "TEDx" ? (
                                <span className="relative inline-block font-extrabold">
                                  <span>TED</span>
                                  <span className="absolute top-[-20%]">x</span>
                                  <span className="opacity-0">x</span>
                                </span>
                              ) : sub.label === 'TEDxUoK' ? (
                                <span className="font-extrabold">
                                  <span className="relative inline-block">
                                    <span>TED</span>
                                    <span className="absolute top-[-20%]">
                                      x
                                    </span>
                                    <span className="opacity-0">x</span>
                                  </span>
                                  <span>UoK</span>
                                </span>
                              ) : sub.label === 'Theme 2026' ? (
                                <span className="font-bold">{sub.label}</span>
                              ) : (
                                sub.label
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={l.to}>
                  <NavLink
                    to={l.to!}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded text-white ${
                        isActive
                          ? "underline decoration-red-600"
                          : "hover:text-red-400"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <Button
                variant="tedxPrimary"
                className="w-full mt-4 justify-center"
                onClick={() => setOpen(false)}
                asChild
              >
                <NavLink to="/register">Register Now</NavLink>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when drawer op*/}
      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </header>
  );
}