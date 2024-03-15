/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html, js}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        general: {
          background: "rgba(124, 152, 133, 1)",
          bars: "rgba(40, 102, 110, 1)",
          tabs: "rgba(0, 0, 0, 0.5)",
          details: "rgba(181, 182, 130)",
        },
        login: {
          backdrop: "rgba(28, 33, 13, 0.5)",
          background: "rgba(245, 248, 221)",
          submit: "rgba(210, 147, 32, 1)",
        },
        bars: {
          notification: "rgba(217, 185, 155, .6)",
          success: "rgba(75, 181, 67, .6)",
          error: "rgba(232, 49, 85, .6)",
        },
        buttons: {
          primary: "rgba(0, 0, 0, 0.5)",
          logout: "rgba(210, 147, 32, 1)",
        },
      },
      fontFamily: {
        jetBrainsMono: ['"JetBrainsMono"', "sans-serif"],
      },
      boxShadow: {
        custom: "0 15px 25px rgba(0, 0, 0, 0.5)",
        green: "0 0 15px #00ff00",
        red: "0 0 15px #ff0000",
        orange: "0 0 15px #ff9900",
        black: "0 0 15px #000000",
        white: "0 0 15px #ffffff",
      },
    },
    screens: {
      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "530px" },
      // => @media (max-width: 529px) { ... }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".input-group input:focus + label, .input-group input:valid + label": {
          transform: "translateY(-24px)",
          color: "rgb(241, 245, 232)",
          fontSize: "0.8rem",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover", "focus", "active"]);
    },
  ],
};
