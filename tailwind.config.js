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
        // Couleurs brique toulousaine - ROUGE ULTRA VIF
        brick: {
          50: '#FFE5E5',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000', // Principal - ROUGE PUR ÉCLATANT
          600: '#CC0000',
          700: '#990000', // Foncé - ROUGE FONCÉ
          800: '#660000',
          900: '#330000',
        },
        // Vert nature - VERT ULTRA VIF
        forest: {
          50: '#E5FFE5',
          100: '#CCFFCC',
          200: '#99FF99',
          300: '#66FF66',
          400: '#33FF33',
          500: '#00CC00', // Principal - VERT PUR ÉCLATANT
          600: '#009900',
          700: '#006600', // Foncé - VERT FONCÉ
          800: '#004400',
          900: '#002200',
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
