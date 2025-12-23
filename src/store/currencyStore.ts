import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

interface BookingState {
  confirmedBookings: Set<string>; // Set of package IDs with confirmed bookings
  confirmBooking: (packageId: string) => void;
  isBookingConfirmed: (packageId: string) => boolean;
  clearConfirmedBooking: (packageId: string) => void;
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
  const symbol = CURRENCY_SYMBOLS[currency] || '';
  return `${symbol}${price.toLocaleString()}`;
};

// Booking confirmation store
export const useBookingStore = create<BookingState>()((set, get) => ({
  confirmedBookings: new Set<string>(),
  confirmBooking: (packageId: string) => {
    const current = get().confirmedBookings;
    const updated = new Set(current);
    updated.add(packageId);
    set({ confirmedBookings: updated });
  },
  isBookingConfirmed: (packageId: string) => {
    return get().confirmedBookings.has(packageId);
  },
  clearConfirmedBooking: (packageId: string) => {
    const current = get().confirmedBookings;
    const updated = new Set(current);
    updated.delete(packageId);
    set({ confirmedBookings: updated });
  },
}));
