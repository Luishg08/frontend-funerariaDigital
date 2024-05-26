/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors:{
        "nav": "#EEEEEE",
        "registrarse": "#3A045B",
        "moradoOscuro": "#3A045B",
        "moradoTitulo": "#732897",
        "grisfondo": "#EEEEEE", 
        "moradoclaroboton": "#BB9CC0",
        "moradoclarodivinicio": "#BB9CC0"
      },
      fontFamily:{
        "junge": ['Junge', 'sans-serif'],
        "lateff": ['Lateef', 'cursive']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


