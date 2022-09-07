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
import { S3_URL } from "utils/GlobalData";
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
  NotActivedPosterContainer,
} from "./PosterSwiperStyle";

type posterProps = {
  posterState: Poster.posterType[];
};

SwiperCore.use([Keyboard, Pagination, EffectCoverflow, Navigation]);

const PosterSwiper = ({ posterState }: posterProps) => {
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [posterAttachment, setPosterAttachment] = useState<string>("");
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  function handleOpenClick(attachment: string) {
    let newAttachment =
      attachment.indexOf("http") !== -1
        ? attachment
        : `${S3_URL}/${attachment}`;
    if (newAttachment.indexOf(".ppt") !== -1) {
      newAttachment = `https://view.officeapps.live.com/op/embed.aspx?src=${newAttachment}`;
    }
    clickPoster(newAttachment);
  }

  function clickPoster(attachment: string) {
    setPosterAttachment(attachment);
    setIsPdfOpen(true);
  }

  const handleMouseOverEvent = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
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

      hoveredEl.classList.add("hoveredNotActiveSlide");
    }
  };

  const handleMouseOutEvent = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
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
      hoveredEl.classList.remove("hoveredNotActiveSlide");
    }
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const handleButtonClick = () => {
    handleClose();
  };
  const handleClose = () => {
    setIsPdfOpen(false);
    setPosterAttachment("");
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
            {/* current pagination과 idx 동일 -> active */}
            {posterState.map((poster, idx) => {
              return (
                <SwiperSlide
                  onMouseOver={handleMouseOverEvent}
                  onMouseOut={handleMouseOutEvent}
                  key={poster.id}
                >
                  {({ isActive }) =>
                    isActive ? (
                      <>
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
                        <PosterOverlay
                          onClick={() => handleOpenClick(poster.attachment)}
                        >
                          <StyledButton
                            onClick={() => handleOpenClick(poster.attachment)}
                            className="zoomIn"
                            size="large"
                          >
                            <ZoomInIcon className="zoomInIcon" />
                          </StyledButton>
                        </PosterOverlay>
                      </>
                    ) : (
                      <>
                        <NotActivedPosterContainer />
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
                      </>
                    )
                  }
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
                <SwiperSlide key={poster.id}>
                  {({ isActive }) =>
                    isActive ? (
                      <PosterInner
                        onClick={() => handleOpenClick(poster.attachment)}
                      >
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
                    ) : (
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
                    )
                  }
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
        <StyledButton onClick={handleButtonClick} className="close">
          <CancelIcon fontSize="large" />
        </StyledButton>
      </PdfContainer>
    </PosterBackground>
  );
};

export default PosterSwiper;
