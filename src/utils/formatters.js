// Currency exchange rates relative to USD
export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)', flag: '🇺🇸' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', flag: '🇬🇧' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'AUD (A$)', flag: '🇦🇺' },
  BDT: { symbol: '৳', rate: 121.5, label: 'BDT (৳)', flag: '🇧🇩' },
};

/**
 * Formats a USD base price into the selected currency.
 */
export function formatCurrency(amountInUSD, currency = 'USD') {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(amountInUSD * info.rate);
  return `${info.symbol}${converted.toLocaleString()}`;
}

/**
 * Generate a unique booking reference code
 */
export function generateBookingRef() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `WL-${randomNum}`;
}

/**
 * Format a date string into readable travel date
 */
export function formatDate(dateString) {
  if (!dateString) return 'Flexible Dates';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
}
