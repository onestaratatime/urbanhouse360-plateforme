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
        // Couleurs brique toulousaine
        brick: {
          50: '#FDF4F4',
          100: '#FCE8E9',
          200: '#F9D5D7',
          300: '#F4B5B9',
          400: '#EC8A91',
          500: '#C1666B', // Principal
          600: '#A54E53',
          700: '#8B3A3A', // Foncé
          800: '#6B2D2D',
          900: '#4D2020',
        },
        // Vert nature
        forest: {
          50: '#F2F8F3',
          100: '#E0F0E1',
          200: '#C2E1C4',
          300: '#9DCD9F',
          400: '#6FB874',
          500: '#48A14D', // Principal
          600: '#3A8740',
          700: '#2D6930', // Foncé
          800: '#235227',
          900: '#1A3D1D',
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
