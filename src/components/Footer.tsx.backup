import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-20">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BF</span>
              </div>
              <span className="text-xl font-bold">Bali Flock</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the magic of Bali with unforgettable travel experiences designed for adventurers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-primary transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/destination" className="text-gray-400 hover:text-primary transition-colors">
                  Destination
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-primary" />
                <a href="mailto:info@baliflock.com" className="hover:text-primary transition-colors">
                  info@baliflock.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} className="text-primary" />
                <a href="tel:+62123456789" className="hover:text-primary transition-colors">
                  +62 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Bali, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary hover:bg-secondary-dark rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent hover:bg-accent-light rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Bali Flock Tours. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
