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
    fontFamily: {}
  },
  plugins: []
} satisfies Config
