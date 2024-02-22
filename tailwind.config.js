/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xsm: '430px',
    },
    extend: {
      colors: {
        prime: '#212529',
        secondary: '#343a40',
        buttonPrimary: '#d90429'
      }
    },
  },
  plugins: [],
}
