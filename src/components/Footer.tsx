import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950 text-white mt-20 border-t border-purple-500/30">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-black text-lg">BF</span>
              </div>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Bali Flock</span>
            </div>
            <p className="text-purple-200/60 text-sm">
              Experience the ultimate party vibes and unforgettable adventures in Bali.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-black text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200/60 hover:text-pink-400 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-purple-200/60 hover:text-pink-400 transition-colors font-medium">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/destination" className="text-purple-200/60 hover:text-pink-400 transition-colors font-medium">
                  Destination
                </Link>
              </li>
              <li>
                <a href="#" className="text-purple-200/60 hover:text-pink-400 transition-colors font-medium">
                  About Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-black text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-purple-200/60">
                <Mail size={18} className="text-pink-400" />
                <a href="mailto:info@baliflock.com" className="hover:text-pink-400 transition-colors font-medium">
                  info@baliflock.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-purple-200/60">
                <Phone size={18} className="text-pink-400" />
                <a href="tel:+62123456789" className="hover:text-pink-400 transition-colors font-medium">
                  +62 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2 text-purple-200/60">
                <MapPin size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="font-medium">Bali, Indonesia</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-black text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Follow Us</h3>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-purple-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-cyan-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-cyan-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200/60 text-sm font-medium">
              &copy; 2025 Bali Flock Tours. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-purple-200/60 hover:text-pink-400 transition-colors text-sm font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-200/60 hover:text-pink-400 transition-colors text-sm font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-purple-200/60 hover:text-pink-400 transition-colors text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
