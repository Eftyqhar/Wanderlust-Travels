/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          emerald: '#064e3b',
          'emerald-light': '#047857',
          'emerald-dark': '#022c22',
          gold: '#d97706',
          'gold-light': '#f59e0b',
          'gold-dark': '#b45309',
          cream: '#fdfbf7',
          sand: '#f5f0eb'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
