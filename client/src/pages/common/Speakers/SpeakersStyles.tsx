import styled from "styled-components";

export const SpeakersContainer = styled.div`
  padding: 100px 30px 152px 30px;
  .speaker-grid {
    width: 31%;
    &:not(:nth-child(3n)) {
      margin-right: 3%;
    }
  }
  .speaker-card {
    position: relative;
    margin-bottom: 25px;
    min-height: calc(100% - 25px);
    align-items: center;
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
