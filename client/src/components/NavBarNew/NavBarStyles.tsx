import styled from "styled-components";
import { useTheme } from "@mui/material";

export const NavBarContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: ${() => {
    const theme = useTheme();
    return `3px solid ${theme.palette.text.primary}`;
  }};
  .nav-wrap {
    max-width: 1200px;
    margin: 0 auto;
    height: calc(100% - 40px);
    padding: 20px 0;
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
      .menu-link {
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
    }

    .login-wrap {
      width: 20%;
    }
  }
`;
