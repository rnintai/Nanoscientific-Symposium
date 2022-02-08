import styled from "styled-components";

export const AsiaSpeakersContainer = styled.div`
  padding: 152px 30px;

  .speaker-image {
    object-fit: cover;
    margin-bottom: 20px;
  }

  .belong {
    color: #7c7c7c;
  }

  //화면이 너무 커지면 사람들의 이미지가 너무 커진다
  @media (min-width: 1600px) {
    padding: 152px;
  }
`;
