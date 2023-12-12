/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '110': '30rem', // Define una clase h-110 que tendrá una altura de 30rem (110 pixels)
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
