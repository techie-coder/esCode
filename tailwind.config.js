/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'grey':'#2C2C2C',
      'gray': '#808080',
      'platinum': '#E5E4E2',
      'platinum-50':'#f2f1ef',
      'black': '#000000',
      'black-50':"#1b1b1b",
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#384ABE',
      'ash': "#212427"
  },
    fontFamily: {
      'display' : ['Inter','sans-serif'],
    },
  plugins: [],
},
}
