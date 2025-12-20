import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyStore, CURRENCY_SYMBOLS } from '@/store/currencyStore';
import { Check } from 'lucide-react';

interface CurrencySelectorProps {
  onConfirm?: () => void;
}

const AVAILABLE_CURRENCIES = ['NZD', 'AUD', 'EUR', 'USD', 'GBP', 'CAD', 'SGD', 'JPY', 'INR', 'IRD'];

export default function CurrencySelector({ onConfirm }: CurrencySelectorProps) {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();
  const [tempCurrency, setTempCurrency] = useState(selectedCurrency);

  const handleConfirm = () => {
    setSelectedCurrency(tempCurrency);
    onConfirm?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Select Your Currency
          </h2>
          <p className="text-muted text-sm">
            Choose your preferred currency to view package prices
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {AVAILABLE_CURRENCIES.map((currency) => (
            <motion.button
              key={currency}
              onClick={() => setTempCurrency(currency)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-lg border-2 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                tempCurrency === currency
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-cardbackground text-foreground hover:border-primary/50'
              }`}
            >
              <span className="text-lg">{CURRENCY_SYMBOLS[currency]}</span>
              <span>{currency}</span>
              {tempCurrency === currency && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <Check size={16} className="text-primary" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-all duration-200"
        >
          Continue to Packages
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
