import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
    colors: {
      blue: "#283D87",
      "light-blue": "#4088C3",
      orange: "#FF6D04"
    },
    fontFamily: {
      sans: "Inter"
    },
    fontSize: {
      h1: [
        "3.125rem",
        {
          lineHeight: "3.125rem",
          letterSpacing: "-0.21875rem",
          fontWeight: "900"
        }
      ],
      h2: [
        "",
        {
          lineHeight: "",
          letterSpacing: "",
          fontWeight: ""
        }
      ],
      h3: [
        "",
        {
          lineHeight: "",
          letterSpacing: "",
          fontWeight: ""
        }
      ]
    }
  },
  plugins: []
} satisfies Config
