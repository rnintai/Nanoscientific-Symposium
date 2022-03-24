import styled from "styled-components";
import { useTheme } from "@mui/material";

export const SpeakersContainer = styled.div`
  padding: 100px 30px 152px 30px;
  .speaker-grid {
    width: 31%;
    &:not(:nth-child(3n)) {
      margin-right: 3%;
    }
  }
  .speaker-card {
    margin-bottom: 25px;
    min-height: calc(100% - 25px);
    align-items: center;

    .speaker-image {
      object-fit: cover;
      width: 200px;
      height: 200px;
      margin: 20px 0;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200px;
      margin: 20px 0;
      background: ${() => {
        const theme = useTheme();
        return theme.palette.background.primaryOverlay;
      }};
    }
  }

  @media (max-width: 1024px) {
    .speaker-grid {
      width: 47%;

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
      &:not(:nth-child(2n)) {
        margin-right: 3%;
      }
    }
  }

  @media (max-width: 1024px) {
    .speaker-grid {
      width: 100%;

      &:not(:nth-child(3n)) {
        margin-right: 0;
      }
    }
  }

  //화면이 너무 커지면 사람들의 이미지가 너무 커진다
  @media (min-width: 1600px) {
    padding: 100px 152px 152px 152px;
  }
`;
