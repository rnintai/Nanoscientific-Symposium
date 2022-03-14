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

  interface PaletteColorOptions {
    main: string;
    contrastText: string;
    contrastTextAlpha: string;
  }

  interface PaletteColor {
    main: string;
    contrastText: string;
    contrastTextAlpha: string;
  }
}

export const theme = createTheme({
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

  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#21ade5",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#fff",
      contrastTextAlpha: "#ffffffad",
    },
  },
});

export const jpTheme = createTheme({
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

  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#21ade5",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#fff",
      contrastTextAlpha: "#ffffffad",
    },
  },
});
