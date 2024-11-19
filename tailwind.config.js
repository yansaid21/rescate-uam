/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customBlue: '#0069A3',
      },
      textShadow: {
        custom: '#00000040',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
