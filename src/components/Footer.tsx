import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook } from 'lucide-react';

// ============================================================
// BALI FLOCK TOURS — FOOTER
// Replace your existing src/components/Footer.tsx with this
// ============================================================

const CONTACT_EMAIL = 'raghavaggarwal2005@gmail.com';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-black text-2xl mb-1">BALI FLOCK</p>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">Tours</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Many Wings, One Journey. NZ-based Bali travel specialists delivering safe, supported, and stress-free group holidays.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}
                className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Packages */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Our Packages</h3>
            <ul className="space-y-3">
              {[
                { label: 'Boys Trip', href: '/packages' },
                { label: 'Girls Trip', href: '/packages' },
                { label: 'Family Reunion', href: '/packages' },
                { label: 'Couples Retreat', href: '/packages' },
                { label: 'Build Your Own', href: '/packages' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Information</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Destination Guide', href: '/destination' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Trust */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <div className="space-y-4 mb-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail size={16} className="text-primary flex-shrink-0" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Why Bali Flock?</p>
              {[
                '✓ NZ-based & operated',
                '✓ Quote within 24 hours',
                '✓ $1,000 deposit to secure',
                '✓ All-inclusive packages',
                '✓ Licensed security available',
              ].map(item => (
                <p key={item} className="text-xs text-gray-400">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[100rem] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Bali Flock Tours. All rights reserved. NZ-based travel facilitator.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Terms & Conditions</Link>
            <Link to="/faq" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">FAQ</Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
