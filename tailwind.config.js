/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xsm': { min: '300px', max: '639px' },
      'sm': '365px',
      'xl': '1200px'

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
