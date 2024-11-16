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
      'platinum': '#F7F8FA',
      'platinum-50':'#f2f1ef',
      'platinum-100': '#d3d3d3',
      'black': '#000000',
      'black-50':"#1b1b1b",
      'blue': '#007AFF',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#384ABE',
      'ash': "#212427",
      'yellow': '#FFBF00',
      'green': '#008000',
      'red': '#FF0000',
      'bright-orange': '#FFAC1C',
  },
    fontFamily: {
      'display' : ['Inter','sans-serif'],
    },
  plugins: [],
},
}
