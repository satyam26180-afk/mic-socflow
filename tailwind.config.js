/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#dc2626', // MIC vibrant crimson
          700: '#be123c', // MIC crimson
          800: '#9f1239', // MIC rich maroon
          900: '#881337', // MIC deep maroon
          950: '#4c0519', // MIC midnight wine
        },
        mic: {
          maroon: '#881337',
          darkMaroon: '#500724',
          crimson: '#dc2626',
          black: '#09090b',
          surface: '#121214',
          card: '#18181b',
          border: '#27272a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 20px -3px rgba(136, 19, 55, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'maroon-glow': '0 0 25px -5px rgba(220, 38, 38, 0.35)',
      }
    },
  },
  plugins: [],
}
