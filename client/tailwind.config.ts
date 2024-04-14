import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  important: true,
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "home-ski-image": "url('src/assets/images/homeski.png')"
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "dark-blue-100": "#283D87",
        "dark-blue-60": "#676E87",
        "light-blue-100": "#4088C3",
        "light-blue-60": "#92ADC3",
        orange: "#FF6D04",
        "orange-60": "#FFA666",
        black: "#242424",
        "gray-4": "#575757",
        "gray-3": "#BDBDBD",
        "gray-2": "#E5E5E5",
        "gray-1": "#FAFAFA",
        red: "#9A141D",
        green: "#109D27"
      },
      fontSize: {
        h1: [
          "3.125rem",
          {
            lineHeight: "normal",
            fontWeight: "900",
            letterSpacing: "-0.219rem"
          }
        ],
        h2: [
          "2.375rem",
          {
            lineHeight: "normal",
            letterSpacing: "-0.16625rem",
            fontWeight: "700"
          }
        ],
        h3: [
          "1.75rem",
          {
            lineHeight: "normal",
            letterSpacing: "-0.123rem",
            fontWeight: "700"
          }
        ],
        h4: [
          "1.313rem",
          {
            lineHeight: "normal",
            letterSpacing: "-0.092rem",
            fontWeight: "400"
          }
        ],
        h5: [
          "0.75rem",
          {
            lineHeight: "normal",
            letterSpacing: "0.045rem",
            fontWeight: "500"
          }
        ],
        p: [
          "1rem",
          {
            lineHeight: "normal",
            letterSpacing: "-0.07rem",
            fontWeight: "400"
          }
        ],
        small: [
          "0.75rem",
          {
            lineHeight: "normal",
            letterSpacing: "-0.015rem",
            fontWeight: "400"
          }
        ]
      }
    }
  },
  plugins: []
} satisfies Config
