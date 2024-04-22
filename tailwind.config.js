/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans'],
      },
      backgroundImage: {
        'footer-texture': 'url("/src/assets/bg.jpg")',
      }
    },
  },
  plugins: [],
}