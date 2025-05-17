import { COLORS } from "./src/services/constants/ColorConstants";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderGray50: COLORS.BORDER_GRAY_50,
        borderGray100: COLORS.BORDER_GRAY_100,
        borderGray200: COLORS.BORDER_GRAY_200,
        borderGray300: COLORS.BORDER_GRAY_300,
        borderGreen200: COLORS.BORDER_GREEN_200,
        borderRed200: COLORS.BORDER_RED_200,
        textBlue400: COLORS.TEXT_BLUE_400,
        textGray400: COLORS.TEXT_GRAY_400,
        textGray500: COLORS.TEXT_GRAY_500,
        textGray700: COLORS.TEXT_GRAY_700,
        textGray800: COLORS.TEXT_GRAY_800,
        textGray900: COLORS.TEXT_GRAY_900,
        textGreen800: COLORS.TEXT_GREEN_800,
        textRed800: COLORS.TEXT_RED_800,
        backgroundBlue50: COLORS.BACKGROUND_BLUE_50,
        backgroundBlue600: COLORS.BACKGROUND_BLUE_600,
        backgroundGreen100: COLORS.BACKGROUND_GREEN_100,
        backgroundRed100: COLORS.BACKGROUND_RED_100,
        backGroundLeft: COLORS.BACKGROUND_GRADIENT_LEFT,
        backGroundRight: COLORS.BACKGROUND_GRADIENT_RIGHT,
        backGroundLeftActive: COLORS.BACKGROUND_GRADIENT_LEFT_ACTIVE,
        backGroundRightActive: COLORS.BACKGROUND_GRADIENT_RIGHT_ACTIVE,
        backGroundLeftTableInitials:
          COLORS.BACKGROUND_GRADIENT_LEFT_TABLE_INITALS,
        backGroundRightTableInitials:
          COLORS.BACKGROUND_GRADIENT_RIGHT_TABLE_INITALS,
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
