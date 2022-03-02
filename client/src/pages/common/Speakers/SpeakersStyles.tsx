import styled from "styled-components";

export const SpeakersContainer = styled.div`
  padding: 100px 30px 152px 30px;
  .speaker-grid {
    &:not(:nth-child(3n)) {
      margin-right: 50px;
    }
  }
  .speaker-card {
    margin-bottom: 25px;
    min-height: calc(100% - 25px);
    align-items: center;

    .speaker-image {
      object-fit: cover;
      height: 300px;
      margin: 20px 0;
    }

    .belong {
      color: #7c7c7c;
    }
  }

  //화면이 너무 커지면 사람들의 이미지가 너무 커진다
  @media (min-width: 1600px) {
    padding: 100px 152px 152px 152px;
  }
`;
