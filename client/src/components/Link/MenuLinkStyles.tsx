import styled from "styled-components";
import { useTheme } from "@mui/material";

export const MenuLinkContainer = styled.div`
  display: flex;
  font-weight: ${() => {
    const theme = useTheme();
    return theme.typography.fontWeightBold;
  }};
  a {
    position: relative;
    &.active {
      color: #fff;
      cursor: default;
    }
    &::before {
      content: "";
      position: absolute;
      width: calc(100% - 20px);
      top: 5px;
      height: 3px;
      background-color: transparent;
      transition: background-color 0.2s ease-in-out;
    }
    &.active::before,
    &:hover::before {
      background-color: ${() => {
        const theme = useTheme();
        return theme.palette.primary.main;
      }};
    }
  }
`;
