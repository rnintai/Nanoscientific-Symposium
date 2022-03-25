import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export const AppContainer = styled.div`
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.background.default;
  }};
  font-family: ${() => {
    const theme = useTheme();
    return theme.typography.body1.fontFamily;
  }};
  color: ${() => {
    const theme = useTheme();
    return theme.palette.text.primary;
  }};

  a {
    padding: 15px 10px;
    color: ${() => {
      const theme = useTheme();
      return theme.palette.text.secondary;
    }};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${() => {
        const theme = useTheme();
        return theme.palette.text.primary;
      }};
    }
  }

  .hover-zoom {
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.02);
    }
  }

  .z0 {
    z-index: 0;
  }
  .z1 {
    z-index: 1;
  }

  .layout {
    max-width: 1024px;
    min-height: calc(100% - 140px);
    margin: 0 auto;
    padding: 70px 50px;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .layout {
      padding: 35px;
    }
  }
`;
