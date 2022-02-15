import styled from "styled-components";

export const JapanArchiveContainer = styled.div`
  padding-top: 150px;

  .banner {
    width: 100vw;
  }

  .content {
    display: flex;
    margin-bottom: 40px;
    border-bottom: 1px solid #c2c2c2;

    .string-content {
      width: 40%;
      display: flex;
      flex-direction: column;
      padding: 30px;
      align-items: center;
      justify-content: space-evenly;

      h1 {
        font-size: 2.4rem;
      }

      button {
        min-width: 300px;
      }
    }

    .video-content {
      width: 60%;
    }
  }

  .speakers {
    border-bottom: 1px solid #c2c2c2;
  }

  .exhibition {
    background-color: #56bbe2;
    display: flex;
    img {
      width: 50%;
      height: 420px;
    }

    .string-section {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      h1 {
        font-size: 3.5rem;
        color: white;
      }

      h5 {
        font-size: 1rem;
        font-weight: bold;
        color: white;
      }
    }
  }

  .last-year {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .video-responsive {
      width: 50%;
    }

    button {
      min-width: 350px;
      margin: 30px 0px;
    }
  }
  @media (min-width: 900px) {
    .css-1ek26j4-MuiPaper-root {
      min-height: 450px;
    }
  }
  @media (min-width: 1300px) {
    .css-1ek26j4-MuiPaper-root {
      min-height: 530px;
    }
  }
  @media (min-width: 1650px) {
    .css-1ek26j4-MuiPaper-root {
      min-height: 550px;
    }
  }

  @media (min-width: 1850px) {
    .css-1ek26j4-MuiPaper-root {
      min-height: 630px;
    }
  }

  @media (max-width: 1000px) {
    .last-year {
      .video-responsive {
        width: 90%;
      }
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
    }
  }

  @media (max-width: 875px) {
    .content {
      width: 100%;
      flex-direction: column;
      align-items: center;
      .string-content {
        margin-top: 20px;
        width: 100%;
        padding: 0;
        h1 {
          font-size: 1.5rem;
        }
        button {
          margin: 10px 0;
        }
      }

      .video-content {
        width: 90%;
        margin-top: 20px;
        border-radius: 10px;
      }
    }
  }
`;
