/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Lato-Regular'],
        customBold: ['Lato-Bold'],
        customLight: ['Lato-Light'],
        customBlack: ['Lato-Black'],
      },
    },
  },
  plugins: [],
};
