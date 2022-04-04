import styled from "styled-components";
import { useTheme } from "@mui/material";

export const EventLandingContainer = styled.div`
  background-color: #fff;
  color: #000;

  img.section-logo {
    margin-left: -20px;
  }
  img.banner-logo {
    width: 300px;
  }

  .body-container {
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 587px);
    height: 100%;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1024px) {
    .body-container {
      min-height: initial;
    }
    img.section-logo {
      margin-left: 0;
    }
  }
  @media screen and (min-width: 1921px) {
    img.banner-logo {
      width: 500px;
    }
  }
`;
