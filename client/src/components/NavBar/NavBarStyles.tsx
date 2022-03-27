import styled from "styled-components";
import { useTheme } from "@mui/material";

export const NavBarContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: ${() => {
    const theme = useTheme();
    return `3px solid ${theme.palette.background.default}`;
  }};
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${() => {
    const theme = useTheme();
    return theme.palette.background.default;
  }};
  box-shadow: 0 3px 6px #0000001c;
  .nav-wrap {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .logo-link {
      max-width: 250px;
      width: 30%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .menu-item-wrap {
      width: 50%;
    }

    .login-wrap {
      width: 20%;
    }

    @media screen and (max-width: 1024px) {
      .menu-item-wrap {
        display: none;
      }

      .login-wrap {
        display: none;
      }
    }
  }
`;
