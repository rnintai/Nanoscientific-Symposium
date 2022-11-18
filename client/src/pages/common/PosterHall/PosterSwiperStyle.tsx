import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

const BREAK_POINT_SMALL_MOBILE = 513;
const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 886;
const BREAK_POINT_SMALL_PC = 1190;
const Break_POINT_BIG_PC = 1540;

export const TitleContainer = styled.div`
  height: 71px;
  background-color: #1d2088;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  width: 100%;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    height: 9px;
    background: #1d2089;
  }

  @media only screen and (max-width: ${Break_POINT_BIG_PC}px) {
    height: 71px;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    height: 51px;

    &::after {
      height: 6px;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    height: 54px;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    &::after {
      height: 4px;
    }
  }
`;

export const PosterTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.1;
  background-color: #1d2088;
  color: #fff;
  padding: 0 5px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // max-height: 71px;
  // height: 66px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: 700;
  text-align: center;
  vertical-align: center;
  width: 100%;

  @media only screen and (max-width: ${Break_POINT_BIG_PC}px) {
    font-size: 14px;
    line-height: 16px;
    // max-height: 71px;
    padding: 0 5px;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    font-size: 11px;
    line-height: 13px;
    /* height: 43px; */
    padding: 1px 5px;
  }

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 11px;
    line-height: 13px;
    // max-height: 43px;
    padding: 1px 5px;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 14px;
    line-height: 14px;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    font-size: 15px;
    /* height: 60px; */
    line-height: 1.1;
    padding: 9px 5px;
  }
`;

export const PosterAuthor = styled.div`
  font-size: 0.75rem;

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    font-size: 0.7rem;
  }
`;

export const DividedLine = styled.div`
  width: 100%;
  min-height: 3px;
  background: linear-gradient(45deg, transparent, #1d2088, transparent);
`;

export const PosterSubTitle = styled.div`
  font-size: 0.813rem;
  line-height: 1.2;
  margin: 8px 0;
  color: #1d2088;

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    font-size: 0.7rem;
  }
`;

export const ImageContainer = styled.div`
  max-width: 100%;
  margin: auto 0;
`;

export const Photos = styled.img`
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 0;
  height: 310px;
`;

export const PosterOverlay = styled.div`
  position: absolute;
  opacity: 0;
  top: 0;
  /*display: none; */
  width: 100%;
  height: 534px;
  background-color: rgba(46, 132, 206, 0.7);
  transition: opacity 0.4s ease;
  cursor: pointer;
  z-index: 998;
`;

export const StyledButton = styled(IconButton)`
  position: absolute;
  cursor: pointer;

  &.zoomIn {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }

  &.close {
    left: 50%;
    transform: translateX(-50%);
    bottom: -4%;
    color: rgba(32, 33, 36, 0.6);
    &:hover {
      color: rgba(32, 33, 36, 0.8);
    }
    cursor: pointer;
    height: 34px;
    width: 34px;
  }
`;

export const PdfContainer = styled.div`
  visibility: hidden; /* opacity:0 */
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  &.is--open {
    visibility: visible;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    height: 65%;
  }
`;

// iframe
export const PdfInner = styled.iframe`
  width: 100%;
  height: 100%;
`;

// 가장 바깥쪽 -> 그림자 비추는 효과 x
export const PosterInner = styled.div`
  width: 100%;
  height: 534px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 변경
  align-items: center;
  background: #ffffff;
  text-align: center;
  padding: 12px 10px;
  /* -webkit-box-reflect: below 0.01px */
  /* linear-gradient(transparent, transparent, #0006); */
  box-shadow: 0px 5px 11px #9fb4d4cf;
`;

export const PosterContainer = styled.div`
  min-height: calc(100vh - 64px - 110px);
  // width: 70%;
  width: 1536px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  // padding: 0 20%;

  .mySwiper {
    width: 100%;
    height: 100%;
    padding: 72px 0;
  }

  .swiper-slide.swiper-slide-active {
    &:hover {
      ${PosterOverlay} {
        opacity: 1;
      }
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    position: relative;

    &:hover {
      ${PosterOverlay} {
        opacity: 0;
      }
    }

    ${PosterInner} {
      pointer-events: none;
    }
  }

  @media only screen and (max-width: ${Break_POINT_BIG_PC}px) {
    width: 1188px;

    ${Photos} {
      height: auto;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    width: 869px;

    ${PosterInner} {
      height: 436px;
    }

    ${PosterOverlay} {
      height: 436px;
    }
  }

  @media only screen and (max-width: 900px) {
    // 변수로 주기
    width: 100%;

    ${PosterInner} {
      height: 367px;
    }

    ${Photos} {
      width: 100%;
      height: 209px;
    }

    ${PosterOverlay} {
      height: 367px;
    }

    .mySwiper {
      padding: 72px 183px; // 좌우(99px)를 키우면 화면에 하나로 볼 수는 없지만 띄워서 볼 수는 있다!
    }

    // .swiper-slide:not(.swiper-slide-active) {
    //   pointer-events: none;
    // }
  }

  @media only screen and (max-width: 1140px) {
    min-height: calc(100vh - 64px - 67px);
  }

  @media only screen and (max-width: 1023.33px) {
    min-height: calc(100vh - 64px - 58px);
  }

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    // 없앨지 생각
    /* width: 745px; */

    /* .swiper-slide { 안먹힘
      width: 440px;
    } */
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    // width: 400px;
    width: 100%;

    ${PosterInner} {
      height: 100%;
    }

    ${Photos} {
      width: 100%;
      height: 321px;
    }

    ${PosterOverlay} {
      height: 100%;
    }

    .mySwiper {
      padding: 72px 100px;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    width: 100%;

    ${Photos} {
      width: 100%;
      height: 277px;
    }
  }

  @media only screen and (max-width: 415px) {
    .mySwiper {
      padding: 72px 54px; // 좌우(99px)를 키우면 화면에 하나로 볼 수는 없지만 띄워서 볼 수는 있다!
    }

    ${Photos} {
      height: 194px;
    }
  }

  @media only screen and (max-width: 300px) {
    ${Photos} {
      height: 157px;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #1d2088;
  }
`;

export const PosterPageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: black;
  visibility: hidden;
  opacity: 0.5;

  &.is--open {
    visibility: visible;
  }
`;

export const PosterBackground = styled.div`
  background-image: url(https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/background.png);
  background-size: cover;
  background-position: center;
`;

export const NotActivedPosterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: black;
  opacity: 0;
`;
