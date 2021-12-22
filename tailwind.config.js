const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { join } = require("path");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

module.exports = {
  content: [join(__dirname, "src/**/*.{html,ts}")],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      // create custom fonts here
      fontFamily: {
        mono: ["'Spartan'", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ball: "0 5px 0px 0px var(--shadow-equal-ball)",
      },
      boxShadow: {
        key: "0 5px 0px 0px var(--shadow-key)",
        "delete-reset": "0 5px 0px 0px var(--shadow-delete-reset)",
        equal: "0 5px 0px 0px var(--shadow-equal-ball)",
      },
      // create custom text colors here
      textColor: {
        fill: withOpacity("--text-fill"),
        key: withOpacity("--text-key"),
        "key-accent": withOpacity("--text-key-accent"),
        "key-equal": withOpacity("--text-key-equal"),
      },
      // create custom background colors here
      backgroundColor: {
        main: withOpacity("--bg-main"),
        key: withOpacity("--bg-key"),
        screen: withOpacity("--bg-screen"),
        "equal-ball": withOpacity("--bg-equal-ball"),
        "toggle-keypad": withOpacity("--bg-toggle-keypad"),
        "delete-reset": withOpacity("--bg-delete-reset"),
      },
      // create custom gradient color here
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen 2xl": {
            maxWidth: "1440px",
          },
        },
      });
    }),
  ],
};
