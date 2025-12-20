import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      selectedCurrency: 'USD',
      setSelectedCurrency: (currency: string) => set({ selectedCurrency: currency }),
    }),
    {
      name: 'currency-storage',
    }
  )
);

// Currency conversion rates (relative to USD)
export const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.35,
  JPY: 149.50,
  INR: 83.12,
  NZD: 1.68,
  IRD: 83.12,
};

// Flags for currency selector UI (modals, dropdowns)
export const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  AUD: '🇦🇺',
  CAD: '🇨🇦',
  SGD: '🇸🇬',
  JPY: '🇯🇵',
  INR: '🇮🇳',
  NZD: '🇳🇿',
  IRD: '🇮🇪',
};

// Symbols for price display
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  JPY: '¥',
  INR: '₹',
  NZD: 'NZ$',
  IRD: '₹',
};

export const convertPrice = (priceInUSD: number, targetCurrency: string): number => {
  const rate = CURRENCY_RATES[targetCurrency] || 1;
  return Math.round(priceInUSD * rate * 100) / 100;
};

export const formatPrice = (price: number, currency: string): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${price.toLocaleString()}`;
};
