/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html, js}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        general: {
          barsPrimary: "rgba(124, 152, 133, 1)",
          barsSecondary: "rgba(124, 152, 133, 0.7)",
          header: "rgba(40, 102, 110, 1)",
          hover: "rgba(181, 182, 130, 1)",
          tabs: "rgba(0, 0, 0, 0.5)",
          zebraEven: "rgba(244, 222, 222, 1)",
          zebraOdd: "rgba(242, 242, 242, 1)",
        },
        modal: {
          backdrop: "rgba(28, 33, 13, 0.5)",
          background: "rgba(245, 248, 221, 1)",
        },
        bars: {
          notification: "rgba(217, 185, 155, 0.6)",
          success: "rgba(75, 181, 67, 0.6)",
          error: "rgba(232, 49, 85, 0.6)",
        },
        buttons: {
          primary: "rgba(0, 0, 0, 0.5)",
          submit: "rgba(210, 147, 32, 1)",
          delete: "rgba(185, 28, 28, 1)",
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
    fontSize: {
      xs: "0.8rem",
      sm: "0.85rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
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
