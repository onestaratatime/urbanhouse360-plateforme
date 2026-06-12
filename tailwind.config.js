/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs brique toulousaine - RENFORCÉES
        brick: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FDC8CA',
          300: '#FCA5A8',
          400: '#F87171',
          500: '#DC2626', // Principal - ROUGE VIF
          600: '#B91C1C',
          700: '#991B1B', // Foncé - ROUGE PROFOND
          800: '#7F1D1D',
          900: '#5C1414',
        },
        // Vert nature - RENFORCÉ
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#16A34A', // Principal - VERT VIF
          600: '#15803D',
          700: '#166534', // Foncé - VERT PROFOND
          800: '#14532D',
          900: '#0F3A21',
        },
        // Neutres chaleureux
        warm: {
          50: '#FDFCFB',
          100: '#F9F7F4',
          200: '#F5F1EC',
          300: '#EBE5DD',
          400: '#D9CEBF',
          500: '#C4B5A0',
          600: '#9D8B73',
          700: '#7A6A55',
          800: '#5C5042',
          900: '#3E3730',
        },
      },
    },
  },
  plugins: [],
}
