import styled from "styled-components";

export const EventLandingKnowledgeCardContainer = styled.a`
  position: relative;
  width: 32.5%;
  // min-height: 637px;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  text-align: left;
  // backface-visibility: hidden;
  padding: 0 !important;

  .img-container {
    height: 219px;
    position: relative;
    .overlay {
      background: linear-gradient(242deg, #52cda7 0%, #4970ff 100%);
      mix-blend-mode: hard-light;
      opacity: 0.3;
      transition: all 0.3s ease;
    }
    img {
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
    }
    overflow: hidden;
  }
  .desc-wrap {
    padding: 40px 30px;
    min-height: 372px;
    display: flex;
    flex-direction: column;

    .topic {
      width: 100%;
      font-size: 20px;
      margin-bottom: 15px;
      color: #283050;
    }
    .desc {
      font-size: 14px;
      color: #6a6e83;
    }
    .learn-more {
      margin-top: auto;
      color: #4970ff;
    }
  }

  &:hover {
    .img-container {
      .overlay {
        opacity: 0;
      }
      img {
        transform: scale(1.1);
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(81deg, #4970ff 0%, #8fe5c2 100%);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .img-container {
      height: 168px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc-wrap {
      min-height: 0px;
      .topic {
        font-size: 16px;
      }
      .desc {
        font-size: 13px;
      }
      .learn-more {
        margin-top: 15px;
        font-size: 13px;
      }
    }
  }
`;
