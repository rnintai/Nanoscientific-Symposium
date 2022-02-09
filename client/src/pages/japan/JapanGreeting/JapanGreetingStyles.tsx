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
    margin: 30px 10px;
    .button-container {
      margin: 10px auto;
      text-align: center;

      button {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 900px) {
    padding: 100px 0 0 0;
    .content-container {
      flex-direction: column;
      align-items: center;

      .image-container {
        width: 70%;
      }
      .desc-container {
        padding: 0;
      }
    }

    .video-container {
      .button-container {
        button {
          font-size: 14px;
        }
      }
    }
  }
`;
