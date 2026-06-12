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
        // Palette olive sophistiquée et apaisante
        olive: {
          50: '#F7F8F5',   // Très clair, presque blanc avec une touche d'olive
          100: '#EBEEE6',  // Gris-vert très doux
          200: '#D4D9CA',  // Sauge claire
          300: '#B8C1A5',  // Vert sauge doux
          400: '#97A47E',  // Olive moyen
          500: '#7A8A5E',  // Olive principal - sophistiqué
          600: '#5F6E47',  // Olive foncé élégant
          700: '#4A5538',  // Vert olive profond
          800: '#3A432B',  // Très foncé, presque noir-vert
          900: '#2A311F',  // Noir-olive pour les textes
        },
        // Neutres chaleureux - conservés
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
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
