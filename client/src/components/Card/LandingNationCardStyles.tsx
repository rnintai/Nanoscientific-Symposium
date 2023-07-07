import styled from "styled-components";

export const LandingNationCardContainer = styled.button`
  text-align: center;
  margin-bottom: 15px;
  width: 32.5%;
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .card-wrap {
    height: 263px;

    .card-image-container {
      position: relative;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      backface-visibility: hidden;
      .card-background {
        transition: all 0.3s ease-in-out;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
      }
      .overlay {
        background: linear-gradient(0deg, #000000 35%, #ffffff 100%) 0% 0%;
        transition: all 0.3s ease-in-out;
        opacity: 0.6;
        mix-blend-mode: hard-light;
      }
    }

    .region-txt {
      position: absolute;
      top: 0;
      right: 0;
      margin: 14px;
      background: transparent linear-gradient(55deg, #4970ff 0%, #8fe5c2 100%)
        0% 0% no-repeat padding-box;
      border-radius: 21px;
      border: 2px solid #ffffff;
      color: #fff;
      padding: 5px 20px;
      font-size: 15px;
      font-weight: 500;
    }

    .date-name-bg {
      width: 100%;
      height: 78px;
      opacity: 0.8;
      background: linear-gradient(224deg, #8fe5c2 0%, #4970ff 100%);
      position: absolute;
      bottom: 0;
    }
    .date-name-txt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 78px;
      position: absolute;
      bottom: 0;
      .name-txt {
        font-size: 22px;
      }
      .date-txt {
        font-size: 16px;
        margin-bottom: 4px;
      }
    }
    &:hover {
      .card-background {
        filter: grayscale(0);
        transform: scale(1.1);
      }
      .overlay {
        opacity: 0;
      }
    }
  }
  .card-wrap.japan {
    .card-background {
      background-position: left;
    }
  }
  @media screen and (max-width: 768px) {
    width: 49%;
    &:not(:nth-child(2n)) {
      margin-right: 5px;
    }
    .card-wrap {
      height: 223px;
      .region-txt {
        font-size: 13px;
        padding: 3px 14px;
        margin: 7px;
      }
      .date-name-txt {
        .name-txt {
          font-size: 14px;
        }
        .date-txt {
          font-size: 13px;
        }
      }
    }
  }
`;
