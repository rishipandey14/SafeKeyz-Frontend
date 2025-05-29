/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this if needed
  ],
  theme: {
    extend: {
      colors: {
        microsoftBlue : '#0078d4',
      },
    },
  },
  plugins: [daisyui], // Enable DaisyUI support
};
