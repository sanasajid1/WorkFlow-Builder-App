import { COLORS } from "./src/services/constants/ColorConstants";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderGray100: COLORS.BORDER_GRAY_100,
        borderGray200: COLORS.BORDER_GRAY_200,
        borderGray300: COLORS.BORDER_GRAY_300,
        textGray500: COLORS.TEXT_GRAY_500,
        textGray900: COLORS.TEXT_GRAY_900,
        backgroundBlue600: COLORS.BACKGROUND_BLUE_600,
        backGroundLeft: COLORS.BACKGROUND_GRADIENT_LEFT,
        backGroundRight: COLORS.BACKGROUND_GRADIENT_RIGHT,
      },
      borderRadius: {
        g8: "8px",
        g40: "40px",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
