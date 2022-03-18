import styled from "styled-components";
import { useTheme } from "@mui/material";

export const MenuLinkContainer = styled.div`
  display: flex;

  a {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: calc(100% - 20px);
      top: 5px;
      height: 3px;
      background-color: transparent;
      transition: background-color 0.2s ease-in-out;
    }
    &:hover::before {
      background-color: ${() => {
        const theme = useTheme();
        return theme.palette.primary.main;
      }};
    }
  }
`;
