/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'meal-background': '#1d1a16',
        'meal-item-price' : '#ffc404',
        'meal-price-background' : '#312c1d',
        'text-color' : '#d9e2f1',
        'modal-background' : '#e4ddd4'
      }
    },
  },
  plugins: [],
}
