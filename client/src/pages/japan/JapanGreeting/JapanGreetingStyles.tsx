import styled from "styled-components";

export const JapanGreetingContainer = styled.div`
  padding: 150px;

  .content-container {
    display: flex;

    .image-container {
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        max-width: 100%;
        height: 235px;
      }

      .string {
        height: 150px;
      }
    }

    .desc-container {
      width: 70%;
      padding: 0 50px;

      .name {
        text-align: right;
      }
    }
  }

  .video-container {
    margin-top: 30px;

    .button-container {
      margin: 10px auto;
      text-align: center;

      button {
        font-size: 20px;
      }
    }
  }
`;
