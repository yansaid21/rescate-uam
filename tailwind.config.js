/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/App.{js,jsz,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#0069A3',
      },
    
      textShadow: {
        'custom': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

