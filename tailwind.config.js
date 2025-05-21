// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {fontFamily: {
//       classico: ['ClassicoStd', 'sans-serif'],
//     },
//   },
//   },
//   plugins: [require('tailwind-scrollbar-hide')],
// }


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', "sans-serif"],
        content: ["Poppins", "sans-serif"],
        classico: ["ClassicoStd", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
