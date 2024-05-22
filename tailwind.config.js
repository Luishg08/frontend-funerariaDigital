/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors:{
        "nav": "#EEEEEE" 
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

