import { useTheme } from "@mui/material";
import styled from "styled-components";

export const ResetPasswordContainer = styled.div`
  .speaker-image {
    object-fit: cover;
    margin-bottom: 20px;
  }

  .belong {
    color: #7c7c7c;
  }

  .half-width {
    width: 49%;
  }

  .step-container {
    width: 40%;
    min-width: 200px;
    margin: 0 auto 60px auto;
    .step-caption {
      transform: translateX(-40%);
      width: 150px;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
      &.active {
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .step-icon {
      font-size: 40px;
      margin: -5px;
      color: rgba(0, 0, 0, 0.3);
      &.active {
        color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.main;
        }};
      }
    }

    .icon-divider {
      height: 3px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      &.active {
        background-color: ${() => {
          const theme = useTheme();
          return theme.palette.primary.main;
        }};
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .half-width {
      width: 100%;
    }

    .step-caption {
      // display: none;
      &.caption2 {
        transform: translate(-40%, -320%);
      }
    }
  }
`;

export const OuterResetContainer = styled.div`
  .banner {
    background-size: cover;
    height: 300px;
    .banner-img {
      margin-left: 30px;
      height: 80px;
      left: 80px;
      position: relative;
    }
  }
  @media screen and (max-width: 1024px) {
    .banner {
      height: 220px;
      background-position: right;
      .banner-img {
        height: 40px;
        left: 0;
      }
    }
  }
`;
