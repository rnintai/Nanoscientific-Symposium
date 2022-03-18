import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false; // 900px
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface Palette {
    warning: Palette["primary"];
    whitescale: Palette["primary"];
    mode: PaletteMode;
  }

  interface PaletteColorOptions {
    main: string;
    contrastText: string;
    contrastTextAlpha?: string;
    alpha50?: string;
    gradation?: string;
  }

  interface PaletteColor {
    main: string;
    contrastText: string;
    contrastTextAlpha?: string;
    alpha50?: string;
    gradation?: string;
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  mode,
  ...(mode === "light"
    ? {
        primary: {
          light: "#0040ff",
          main: "#21ade5",
          dark: "#189cd1",
          contrastText: "#fff",
          contrastTextAlpha: "#ffffffad",
          gradation: "linear-gradient(270deg, #243d7c, #26a4dd)",
        },
        warning: {
          main: "#FF0000",
          contrastText: "#fff",
          contrastTextAlpha: "#ffffffad",
        },
        whitescale: {
          main: "#fff",
          alpha50: "#ffffff66",
        },
      }
    : {
        // dark
        primary: {
          contrastText: "rgba(0, 0, 0, 0.87)",
          dark: "#42a5f5",
          light: "#e3f2fd",
          main: "#1CAFE4",
          gradation: "linear-gradient(270deg, #243d7c, #26a4dd)",
        },
        // warning: {
        //   main: "#FF0000",
        //   contrastText: "#fff",
        //   contrastTextAlpha: "#ffffffad",
        // },
        // whitescale: {
        //   main: "#fff",
        //   alpha50: "#ffffff66",
        // },
        background: {
          default: "#3C3D3B",
        },
      }),
});

export const theme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: `"Open Sans", sans-serif`,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
      },
    },
    palette: getDesignTokens(mode),
  });
};

export const jpTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: `"Noto Sans JP", sans-serif`,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
      },
    },
    palette: getDesignTokens(mode),
  });
};
