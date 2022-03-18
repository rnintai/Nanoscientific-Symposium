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
`;
