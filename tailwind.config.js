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
        "delete-reset": withOpacity("--shadow-delete-reset"),
        equal: withOpacity("--shadow-equal"),
        key: withOpacity("--shadow-key"),
      },
      // create custom text colors here
      textColor: {
        fill: withOpacity("--text-fill"),
        inverted: withOpacity("--text-inverted"),
      },
      // create custom background colors here
      backgroundColor: {
        main: withOpacity("--bg-main"),
        equal: withOpacity("--bg-equal"),
        key: withOpacity("--bg-key"),
        screen: withOpacity("--bg-screen"),
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
