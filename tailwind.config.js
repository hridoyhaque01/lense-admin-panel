/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gradientColor: "#FF9D80",
      disabledColor: "#797979",
      pureBlackColor: "#000000",

      blackHigh: "#474747",
      blackMid: "#6C6C6C",
      blackLow: "#919191",
      blackSemi: "#616161",

      blueLight: "#F0F1FF",
      navyDark : "#202658",
      // #2ED3D2
      whiteHigh: "#FFFFFF",
      whiteMid: "#F5F5F5",
      whiteSemi: "#F6F6F6",
      whiteLow: "#E8E8E8",

      successColor: "#00AE5B",
      successColor: "#00AE5B",
      warningColor: "#FF6D00",
      warningLightColor: "#FFEBEB",
      errorColor: "#FF4646",
      errorMidColor: "#FF6B6B",
      errorLightColor: "#FD5D5D",
      infoColor: "#2ED3D2",
      alertColor: "#F4A100",

      primaryMain: "#515EDB",
      primaryMainDark: "#042B2F",
      primaryMainDarker: "#652411",
      primaryMainDarkest: "#321209",
      primaryMainLight: "#2D8EFF",
      primaryMainLighter: "#FD7C55",
      primaryMainLightest: "#FFEFEB",

      secondaryMain: "#3BCE7F",
      secondaryMainDark: "#2C9292",
      secondaryMainDarker: "#216D6D",
      secondaryMainDarkest: "#0B2424",
      secondaryMainLight: "#37B6B6",
      secondaryMainLighter: "#AFE2E2",
      secondaryMainLightest: "#D7F0F0",
    },
    backgroundImage: {
      "gradient-primary":
        "linear-gradient(143.77deg, rgba(255, 255, 255, 0.36) 30.9%, rgba(255, 255, 255, 0.03) 83.54%);",
      "gradient-secondary":
        "linear-gradient(175.57deg, #FC8165 -36.85%, rgba(255, 255, 255, 0.25) 107.36%);",
        "login" : "url('./Assets/img/bg.png')"
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
