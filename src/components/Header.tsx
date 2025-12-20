import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyStore, CURRENCY_FLAGS, CURRENCY_SYMBOLS } from '@/store/currencyStore';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();

  const AVAILABLE_CURRENCIES = ['NZD', 'AUD', 'EUR', 'USD', 'GBP', 'CAD', 'SGD', 'JPY', 'INR', 'IRD'];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/30 shadow-lg">
      <nav className="max-w-[100rem] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="text-white font-black text-2xl leading-none tracking-tighter">F🔒</span>
          </motion.div>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hidden sm:inline">Bali Flock</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-white/80 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/packages"
            className="text-white/80 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 transition-all duration-300"
          >
            Packages
          </Link>
          <Link
            to="/about"
            className="text-white/80 font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 transition-all duration-300"
          >
            About Us
          </Link>

          {/* Currency Selector */}
          <div className="relative">
            <motion.button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 border border-white/20"
            >
              <Globe size={18} />
              <span>{CURRENCY_FLAGS[selectedCurrency]}</span>
              <span>{selectedCurrency}</span>
            </motion.button>

            <AnimatePresence>
              {showCurrencyDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-lg shadow-xl z-50 min-w-max"
                >
                  {AVAILABLE_CURRENCIES.map((currency) => (
                    <motion.button
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setShowCurrencyDropdown(false);
                      }}
                      whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                      className={`w-full text-left px-4 py-2 font-semibold transition-colors ${
                        selectedCurrency === currency
                          ? 'text-pink-400 bg-white/10'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {CURRENCY_FLAGS[currency]} {currency}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-purple-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-pink-400 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-gradient-to-b from-slate-900 to-purple-900 border-t border-purple-500/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="max-w-[100rem] mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-white/80 font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-white/80 font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className="text-white/80 font-semibold hover:text-pink-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Currency Selector */}
            <div className="border-t border-purple-500/30 pt-4 mt-4">
              <p className="text-white/60 text-sm font-semibold mb-3">Select Currency</p>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_CURRENCIES.map((currency) => (
                  <motion.button
                    key={currency}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                      selectedCurrency === currency
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {CURRENCY_FLAGS[currency]} {currency}
                  </motion.button>
                ))}
              </div>
            </div>

            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 w-full">
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
