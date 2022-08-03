import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper";
// import IconButton from '@mui/material/IconButton';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CancelIcon from "@mui/icons-material/Cancel";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  PosterContainer,
  Photos,
  PosterInner,
  PosterTitle,
  PosterAuthor,
  PosterSubTitle,
  DividedLine,
  ImageContainer,
  PosterOverlay,
  PdfContainer,
  PdfInner,
  PosterPageOverlay,
  StyledButton,
} from "./PosterSwipterStyle";

type posterProps = {
  posterState: Poster.posterType[];
};

const option = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

SwiperCore.use([Keyboard, Pagination, EffectCoverflow, Navigation]);

const PosterSwiper = ({ posterState }: posterProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  function handleOpenClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const clickedTarget = target.parentElement;
    clickPoster(clickedTarget, index);
  }

  function handleZoomInClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) {
    e.preventDefault();
    const clickedTarget = document.querySelector(
      ".swiper-slide-active",
    ) as HTMLDivElement;
    clickPoster(clickedTarget, index); // clickedTarget.classList.contains("hover-able") 이 로직을 빼는게 효율적
  }

  function clickPoster(clickedTarget: HTMLElement, index: number) {
    // window.open(`https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`, "_blank"); // 다른 창으로 크게 생성
    if (
      clickedTarget.classList.contains("swiper-slide-active") &&
      clickedTarget.classList.contains("hover-able")
    ) {
      const ancesterEl =
        clickedTarget.parentElement.parentElement.parentElement.parentElement;
      const iframeOuter = (ancesterEl as HTMLDivElement | null).querySelector(
        ".PdfContainer",
      );
      const iframeInner = iframeOuter.children[0] as HTMLImageElement | null;
      const backgroundOverlay = ancesterEl.querySelector(
        ".PdfBackgroundOverlay",
      ) as HTMLDivElement | null;
      if (iframeOuter != null) {
        iframeOuter.classList.add("is--open");
        backgroundOverlay.classList.add("is--open");
      }
      if (iframeInner != null) {
        iframeInner.src = `https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${
          index + 1
        }.pdf`;
      }
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement | null;
    const targetParentEl = target.parentElement;
    const iframeOuter = (targetParentEl.children[3] as HTMLDivElement) || null;
    iframeOuter.classList.remove("is--open");
    target.classList.remove("is--open");
  };

  const handleMouseOverEvent = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const hoveredEl = (e.target as HTMLDivElement | null).parentElement;

    if (
      hoveredEl.classList.contains("swiper-slide") &&
      !hoveredEl.classList.contains("swiper-slide-active")
    ) {
      const resultArr = hoveredEl.style.transform.split(" ");
      let resultStr = "";
      resultArr.push("translateY(-80px)");
      resultStr = resultArr.join(" ");
      hoveredEl.style.transform = resultStr;
    }

    if (hoveredEl.classList.contains("swiper-slide-active")) {
      hoveredEl.classList.add("hover-able");
    }
  };

  const handleMouseOutEvent = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const hoveredEl = (e.target as HTMLDivElement | null).parentElement;

    if (
      hoveredEl.classList.contains("swiper-slide") &&
      !hoveredEl.classList.contains("swiper-slide-active")
    ) {
      const resultArr = hoveredEl.style.transform.split(" ");
      let resultStr = "";
      resultArr.pop();
      resultStr = resultArr.join(" ");
      hoveredEl.style.transform = resultStr;
    }

    if (hoveredEl.classList.contains("swiper-slide-active")) {
      hoveredEl.classList.remove("hover-able");
    }
  };

  const handleZoomInMouseOverEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const hoveredEl = e.target as HTMLDivElement | null;
    const activePosterEl = hoveredEl.parentElement.parentElement;
    activePosterEl.classList.add("hover-able");
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement | null;
    const openedEls = document.querySelectorAll(".is--open");
    openedEls.forEach((El) => El.classList.remove("is--open"));
  };

  return (
    <>
      <PosterContainer>
        <Swiper
          slideToClickedSlide
          // {...swiperSetting}
          effect="coverflow"
          grabCursor
          centeredSlides
          navigation
          style={
            {
              // "--swiper-navigation-color": "#fff",
              // "--swiper-pagination-color": "#fff",
              // "background": "#ccc"
            }
          }
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            type: "fraction",
          }}
          coverflowEffect={{
            rotate: 5,
            stretch: 10,
            depth: 300, // 가운데 제외 모두 들어가는 깊이
            modifier: 2, // 가운데 모이는 정도(0: 사이간격 안겹침)
            slideShadows: false,
          }}
          breakpoints={{
            769: {
              spaceBetween: 0,
              slidesPerView: 4,
            },
            300: {
              spaceBetween: 0,
              slidesPerView: 1,
            },
          }}
          // on={{
          //     init: function(){
          //         console.log('init');
          //     },
          //     tap: (swiper, event) => console.log(`clicked! ${event}`),
          // }}
          className="mySwiper"
        >
          {posterState.map((poster, idx) => (
            <SwiperSlide
              className="swiperSlide"
              onMouseOver={handleMouseOverEvent}
              onMouseOut={handleMouseOutEvent}
              onClick={(event) => handleOpenClick(event, idx)}
              key={poster.id}
            >
              <PosterInner>
                <PosterTitle>{poster.title}</PosterTitle>
                <PosterAuthor>{poster.author}</PosterAuthor>
                <DividedLine />
                <PosterSubTitle>{poster.sub_title}</PosterSubTitle>
                <ImageContainer>
                  <Photos src={poster.image} alt={`pic ${idx + 1}`} />
                </ImageContainer>
              </PosterInner>
              <PosterOverlay>
                <StyledButton
                  onMouseOver={handleZoomInMouseOverEvent}
                  onClick={(event) => handleZoomInClick(event, idx)}
                  className="ZoomIn"
                  size="large"
                >
                  <ZoomInIcon />
                </StyledButton>
              </PosterOverlay>
            </SwiperSlide>
          ))}
        </Swiper>
      </PosterContainer>
      <PosterPageOverlay
        onClick={handleOverlayClick}
        className="PdfBackgroundOverlay"
      />
      <PdfContainer className="PdfContainer">
        <PdfInner />
        <StyledButton onClick={handleClose} className="Close">
          <CancelIcon fontSize="large" />
        </StyledButton>
      </PdfContainer>
    </>
  );
};

export default PosterSwiper;
