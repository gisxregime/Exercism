
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ocean: '#1B4965',
        olive: '#4A7C59',
        cream: '#FEF3C7',
        amber: {
          accent: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
