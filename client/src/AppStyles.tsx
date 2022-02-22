import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export const AppContainer = styled.div`
  font-family: ${() => {
    const theme = useTheme();
    return theme.typography.body1.fontFamily;
  }};
`;
