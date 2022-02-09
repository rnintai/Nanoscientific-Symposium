import styled from "styled-components";

export const JapanSpeakersContainer = styled.div`
  padding: 152px 30px;

  .speaker-image {
    object-fit: cover;
    margin-bottom: 20px;
  }

  .belong {
    color: #7c7c7c;
  }

  .homework {
    font-size: 14px;
  }

  //다운로드버튼

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    button {
      font-size: 20px;
    }
  }

  //화면이 너무 커지면 사람들의 이미지가 너무 커진다
  @media (min-width: 1600px) {
    padding: 152px;
  }
`;
