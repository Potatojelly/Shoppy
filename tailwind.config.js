/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0E1932",
        ariaColor: "#C67646",
        brandWhite: "#FFFFFF",
      },
      backgroundImage: {
        banner: `url("../public/images/banner.png")`,
      },
      aria: {
        
      }
    },
  },
  plugins: [],
}

