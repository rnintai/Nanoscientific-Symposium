import styled from "styled-components";
import { useTheme } from "@mui/material";

export const LandingSectionContainer = styled.div`
  border-bottom: ${() => {
    const theme = useTheme();
    return `3px solid ${theme.palette.text.primary}`;
  }};
  background-size: cover;
  background-position: center;

  .gradient-box {
    background: ${() => {
      const theme = useTheme();
      return theme.palette.primary.verticalGradation;
    }};
  }

  &.fullWidth {
    width: 100%;
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

// transition: background-color 0.2s ease-in-out;
// padding: 15px 10px;
// &.primary {
//   color: ${() => {
//     const theme = useTheme();
//     return theme.palette.text.primary;
//   }};
//   &:hover {
//     background-color: rgba(33, 173, 229, 0.04);
//   }
//   &:active {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// }
// &.gradient {
//   background: ${() => {
//     const theme = useTheme();
//     return theme.palette.primary.gradation;
//   }};
//   border: 2px solid #fff;
//   border-radius: 25px;
//   padding: 2px 12px;
// }
// display: flex;
// align-items: center;
