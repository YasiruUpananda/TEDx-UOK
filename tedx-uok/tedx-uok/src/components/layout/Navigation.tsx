import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Speakers', href: '/speakers', isRoute: true },
    { label: 'Agenda', href: '/agenda', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true },
    { label: 'Register', href: '/registration', isRoute: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || location.pathname !== '/'
        ? 'bg-[#0E0E0E] border-b border-white/10 shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white hover:text-[#EB0028] transition-colors cursor-pointer">
            TEDxUOK
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white hover:text-[#EB0028] transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB0028] transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-[#EB0028] transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB0028] transition-all duration-200 group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          <button
            className="lg:hidden text-white hover:text-[#EB0028] transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="px-6 lg:px-12 py-4">
              {menuItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block py-3 text-white hover:text-[#EB0028] transition-colors duration-200 font-medium border-b border-white/5 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-3 text-white hover:text-[#EB0028] transition-colors duration-200 font-medium border-b border-white/5 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}