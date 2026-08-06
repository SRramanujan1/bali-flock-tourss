import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';

// ============================================================
// BALI FLOCK TOURS — HEADER
// Replace your existing src/components/Header.tsx with this
// ============================================================

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
  { label: 'Destination', href: '/destination' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const LOGO_URL = 'https://static.wixstatic.com/media/b57044_d20c708aa6ec4cdb9d761e228ad676a8~mv2.png';
// TODO: Replace LOGO_URL with the actual uploaded logo URL from Wix Media Manager
// Upload your logo: Wix Dashboard → Media Manager → Upload → copy the URL

const CONTACT_EMAIL = 'raghavaggarwal2005@gmail.com';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 hidden md:block">
        <div className="max-w-[100rem] mx-auto px-6 flex justify-between items-center">
          <span className="text-gray-400">🌴 NZ-based Bali travel specialists — Safe, Supported & Stress-free</span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <Mail size={12} />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white border-b border-gray-100'}`}>
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Bali Flock Tours"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image fails
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="hidden sm:block">
                <p className="font-black text-xl text-gray-900 leading-tight">BALI FLOCK</p>
                <p className="text-xs text-primary font-semibold tracking-widest uppercase">Tours</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href ||
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                to="/packages"
                className="hidden md:inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
              >
                Get a Quote
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="max-w-[100rem] mx-auto px-6 py-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-gray-100">
                  <Link
                    to="/packages"
                    className="block w-full text-center bg-primary text-white font-bold px-5 py-3 rounded-lg"
                  >
                    Get a Quote
                  </Link>
                </div>
                <p className="text-center text-xs text-gray-400 pt-2">{CONTACT_EMAIL}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
