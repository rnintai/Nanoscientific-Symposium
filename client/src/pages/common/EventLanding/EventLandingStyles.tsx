import styled from "styled-components";
import { useTheme } from "@mui/material";

export const EventLandingContainer = styled.div`
  background-color: #fff;
  color: #000;

  .title {
    width: 100%;
    text-align: left;
    font-weight: 700;
    color: #283050;
    font-size: 26px;
    margin-bottom: 40px;
  }

  .top-logo-section {
    max-width: 1222px;

    img {
      width: 268px;
      margin: 24px 0px;
    }
  }

  img.section-logo {
    max-width: 370px;
    margin-right: 20px;
  }
  .banner-section {
    height: 500px;
  }
  .video-section {
    padding-top: 70px;
  }

  .body-container {
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
  }
  .section {
    margin-bottom: 80px;
  }
  .landing-layout {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 0;
    .caution {
      font-size: 14px;
      color: #6a6e83;
      width: 100%;
      text-align: right;
      margin-top: 15px;
    }

    .sponsors-title {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 3px;
        background: linear-gradient(81deg, #4970ff 0%, #8fe5c2 100%);
      }
    }
    .sponsor-logo {
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .bg-skyblue {
    background-color: #ecf2fb;
  }

  .section-3-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (min-width: 1921px) {
    .banner-section {
      height: 600px;
    }
  }

  @media screen and (max-width: 1400px) {
    .landing-layout {
      width: 90%;
    }
    .top-logo-section {
      display: flex !important;
      justify-content: center;
      img {
        width: auto;
        margin: 10px 0;
        height: 40px;
      }
    }
    .banner-section {
      height: 170px;
    }
    .video-section {
      padding-top: 35px;
    }
    img.section-logo {
      max-width: 220px;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    .teaser-video {
      height: auto;
      width: 100%;
    }

    .nation-card-wrap {
      width: 100%;
    }

    .swiper-topic {
      overflow: visible;
      clip-path: inset(-100vw -100vw -100vw 0);
    }
  }
  @media screen and (max-width: 768px) {
    .landing-layout {
      width: 90%;
      padding: 40px 0;
      .caution {
        font-size: 12px;
      }

      .sponsor-desc {
        margin-bottom: 40px;
      }
      .sponsor-logo {
        &:not(:last-child) {
          margin-right: 0;
        }
      }
      .sponsor-1-logo {
        img {
          height: 30px;
        }
      }
      .sponsor-2-logo {
        img {
          height: 110px;
        }
      }
      .sponsor-3-logo {
        img {
          height: 110px;
        }
      }
    }

    .banner-section {
      height: 67vw;
    }
    .body-container {
      .section {
        margin-bottom: 40px;
      }
    }
    .title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .desc {
      font-size: 13px;
    }

    .section-1-wrap .section,
    .section-3-wrap {
      flex-direction: column;
    }
    .section-1-wrap .section {
      width: 100%;
      .desc-wrap {
        width: 100%;
        margin-bottom: 30px;
      }
    }
  }
`;
