/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      primary: ['Permanent Marker', 'cursive'],
      secondary: ['Itim', 'cursive'],
      tertiary: ['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}
