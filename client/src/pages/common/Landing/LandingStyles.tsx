import { useTheme } from "@mui/material";
import styled from "styled-components";

export const LandingContainer = styled.div`
  .sticky-menu {
    position: fixed;
    top: 15%;
    left: 85%;
    width: 200px;
    background-color: ${() => {
      const theme = useTheme();
      return theme.palette.grey[50];
    }};
    border: 1px solid
      ${() => {
        const theme = useTheme();
        return theme.palette.grey[300];
      }};
    padding: 20px 15px 5px 15px;
    margin: 15px;
    box-shadow: ${() => {
      const theme = useTheme();
      return theme.shadows[3];
    }};
  }
  .bg-alpha {
    background-color: #21ade517;
  }
  .bg-transition {
    transition: background-color 0.2s ease;
  }

  .edit-btn,
  .sponsor-edit-btn,
  .landing6-edit-btn {
    position: absolute;
    color: ${() => {
      const theme = useTheme();
      return theme.palette.primary.main;
    }};
    margin: 8px;
    transform: translateX(-150%);
    border: 1px solid #21ade542;
  }

  .sponsor-edit-btn {
    transform: translateX(-30px);
    margin: 0;
  }
  .landing6-edit-btn {
    transform: translate(270px, -51px);
    margin: 0;
  }
`;
