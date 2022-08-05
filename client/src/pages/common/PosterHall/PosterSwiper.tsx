import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper";

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
  PosterBackground,
  TitleContainer,
} from "./PosterSwiperStyle";

type posterProps = {
  posterState: Poster.posterType[];
};

SwiperCore.use([Keyboard, Pagination, EffectCoverflow, Navigation]);

const PosterSwiper = ({ posterState }: posterProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [posterAttachment, setPosterAttachment] = useState<string>("");
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  function handleOpenClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    attachment: string,
  ) {
    const target = e.target as HTMLDivElement;
    const clickedTarget = target.parentElement;
    if (windowWidth > 900) {
      clickPoster(clickedTarget, attachment);
    } else {
      setPosterAttachment(attachment);
      setIsPdfOpen(true);
    }
  }

  function handleZoomInClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    attachment: string,
  ) {
    e.preventDefault();
    const clickedTarget = document.querySelector(
      ".swiper-slide-active",
    ) as HTMLDivElement;
    clickPoster(clickedTarget, attachment); // clickedTarget.classList.contains("hover-able") 이 로직을 빼는게 효율적
  }

  function clickPoster(clickedTarget: HTMLElement, attachment: string) {
    if (
      clickedTarget.classList.contains("swiper-slide-active") &&
      clickedTarget.classList.contains("hover-able")
    ) {
      setPosterAttachment(attachment);
      setIsPdfOpen(true);
    }
  }

  const handleOverlayClick = () => {
    setIsPdfOpen(false);
  };

  const handleMouseOverEvent = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const hoveredEl = (e.target as HTMLDivElement | null).parentElement;

    if (
      hoveredEl.classList.contains("swiper-slide") && // search button을 hover했을 때, 오류 방지
      !hoveredEl.classList.contains("swiper-slide-active")
    ) {
      const resultArr = hoveredEl.style.transform.split(" ");
      let resultStr = "";
      resultArr.push("translateY(-15px)");
      resultStr = resultArr.join(" ");
      hoveredEl.style.transform = resultStr;
    }

    if (hoveredEl.classList.contains("swiper-slide-active")) {
      setIsHover(true);
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
      setIsHover(false);
    }
  };

  const handleZoomInMouseOverEvent = () => {
    setIsHover(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const openedEls = document.querySelectorAll(".is--open");
    openedEls.forEach((El) => El.classList.remove("is--open"));
  };

  useEffect(() => {
    function handleWindowResize() {
      setwindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <PosterBackground>
      <PosterContainer>
        {windowWidth > 900 ? (
          <Swiper
            slideToClickedSlide
            effect="coverflow"
            spaceBetween={0}
            slidesPerView={4}
            grabCursor
            centeredSlides
            navigation
            key="a"
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
              type: "fraction",
            }}
            coverflowEffect={{
              rotate: 5,
              stretch: 10,
              depth: 300, // 가운데 제외 모두 들어가는 깊이
              modifier: 2, // 가운데 모이는 정도(0: 사이간격 안겹침)
              slideShadows: false,
            }}
            className="mySwiper"
          >
            {posterState.map((poster, idx) => {
              return (
                <SwiperSlide
                  className={isHover ? "hover-able" : ""}
                  onMouseOver={handleMouseOverEvent}
                  onMouseOut={handleMouseOutEvent}
                  onClick={(event) => handleOpenClick(event, poster.attachment)}
                  key={poster.id}
                >
                  <PosterInner>
                    <TitleContainer>
                      <PosterTitle>{poster.title}</PosterTitle>
                    </TitleContainer>
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
                      onClick={(event) =>
                        handleZoomInClick(event, poster.attachment)
                      }
                      className="ZoomIn"
                      size="large"
                    >
                      <ZoomInIcon />
                    </StyledButton>
                  </PosterOverlay>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Swiper
            grabCursor
            centeredSlides
            spaceBetween={100}
            slidesPerView={1}
            navigation
            key="b"
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
              type: "fraction",
            }}
            className="mySwiper"
          >
            {posterState.map((poster, idx) => {
              return (
                <SwiperSlide
                  className={isHover ? "hover-able" : ""}
                  onClick={(event) => handleOpenClick(event, poster.attachment)}
                  key={poster.id}
                >
                  <PosterInner>
                    <TitleContainer>
                      <PosterTitle>{poster.title}</PosterTitle>
                    </TitleContainer>
                    <PosterAuthor>{poster.author}</PosterAuthor>
                    <DividedLine />
                    <PosterSubTitle>{poster.sub_title}</PosterSubTitle>
                    <ImageContainer>
                      <Photos src={poster.image} alt={`pic ${idx + 1}`} />
                    </ImageContainer>
                  </PosterInner>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </PosterContainer>
      <PosterPageOverlay
        onClick={handleOverlayClick}
        className={isPdfOpen ? "is--open" : ""}
      />
      <PdfContainer className={isPdfOpen ? "is--open" : ""}>
        <PdfInner src={posterAttachment} />
        <StyledButton onClick={handleClose} className="Close">
          <CancelIcon fontSize="large" />
        </StyledButton>
      </PdfContainer>
    </PosterBackground>
  );
};

export default PosterSwiper;
