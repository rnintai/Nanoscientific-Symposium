import styled from "styled-components";
import { useTheme } from "@mui/material";

export const EventLandingContainer = styled.div`
  background-color: #fff;
  color: #000;

  img.section-logo {
    margin-left: -20px;
  }

  @media and (max-width: 1024px) {
    img.section-logo {
      margin-left: 0;
    }
  }
`;
