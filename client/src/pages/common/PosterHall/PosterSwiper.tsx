import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Navigation, Pagination, EffectCoverflow } from "swiper";

// import "swiper/swiper.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/effect-coverflow/effect-coverflow.sss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { PosterContainer, Photos, PosterInner, PosterTitle, PosterAuthor, PosterSubTitle, DividedLine, ImageContainer, PosterOverlay, PdfContainer, PdfInner, PosterPageOverlay, ZoomInButton, CloseButton } from './PosterSwipterStyle';

// pdfjs
import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type posterProps = {
    posterState: Poster.posterType[];
}

const option = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

SwiperCore.use([Keyboard, Pagination, EffectCoverflow, Navigation]);

const PosterSwiper = ({ posterState }: posterProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [swiperSetting, setSwiperSetting] = useState<any | null>(null); // any -> Swiper


    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleOpenClick(e: React.MouseEvent<HTMLElement, MouseEvent>, index: number) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const clickedTarget = target.parentElement;
        // window.open(`https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`, "_blank"); // 다른 창으로 크게 생성
        if (target.parentElement.classList.contains("swiper-slide-active")) {
            const ancesterEl = clickedTarget.parentElement.parentElement.parentElement.parentElement;
            const iframeOuter = ancesterEl.children[3] as HTMLDivElement | null;
            const iframeInner = iframeOuter.children[0] as HTMLImageElement | null;
            const backgroundOverlay = ancesterEl.children[2] as HTMLDivElement | null;
            if (iframeOuter != null) {
                iframeOuter.classList.add('is--open');
                backgroundOverlay.classList.add('is--open');
            }
            if (iframeInner != null) {
                iframeInner.src = `https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`;
            }
        }
    }

    const handleOverlayClick = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = (e.target as HTMLDivElement | null);
        const targetParentEl = target.parentElement;
        const iframeOuter = targetParentEl.children[3] as HTMLDivElement || null;
        iframeOuter.classList.remove('is--open');
        target.classList.remove('is--open');
    }

    const handleMouseOverEvent = (e) => {
        e.preventDefault();
        const hoveredEl = e.target.parentElement;

        if (hoveredEl.classList.contains("swiper-slide") && !hoveredEl.classList.contains("swiper-slide-active")) {
            let resultArr = hoveredEl.style.transform.split(' ');
            resultArr.push('translateY(-80px)');
            resultArr = resultArr.join(' ');
            hoveredEl.style.transform = resultArr;
        }
    };

    const handleMouseOutEvent = (e) => {
        e.preventDefault();
        const hoveredEl = e.target.parentElement;

        if (hoveredEl.classList.contains("swiper-slide") && !hoveredEl.classList.contains("swiper-slide-active")) {
            let resultArr = hoveredEl.style.transform.split(' ');
            resultArr.pop();
            resultArr = resultArr.join(' ');
            hoveredEl.style.transform = resultArr;
        }
    };

    const handleClose = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        const target = (e.target as HTMLDivElement | null);
        const openedEls = document.querySelectorAll(".is--open");
        openedEls.forEach(El => El.classList.remove("is--open"));
    }

    return (
        <>
            <PosterContainer>
                <Swiper
                    slideToClickedSlide={true}
                    // {...swiperSetting}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    navigation={true}
                    style={{
                        // "--swiper-navigation-color": "#fff",
                        // "--swiper-pagination-color": "#fff",
                        // "background": "#ccc"
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    loop={true}
                    pagination={{ clickable: true, dynamicBullets: true, type: "fraction" }}
                    coverflowEffect={{
                        rotate: 5,
                        stretch: 10,
                        depth: 300, // 가운데 제외 모두 들어가는 깊이
                        modifier: 2, // 가운데 모이는 정도(0: 사이간격 안겹침)
                        slideShadows: false,
                    }}
                    breakpoints={{
                        700: {
                            spaceBetween: 0,
                            slidesPerView: 4,
                        },
                        500: {
                            spaceBetween: 100,
                            slidesPerView: 2,
                        },
                        411: {
                            spaceBetween: 100,
                            slidesPerView: 2,
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
                        <SwiperSlide className="swiperSlide" onMouseOver={handleMouseOverEvent} onMouseOut={handleMouseOutEvent} onClick={event => handleOpenClick(event, idx)} key={idx}>
                            <PosterInner>
                                <PosterTitle>{poster.title}</PosterTitle>
                                <PosterAuthor>{poster.author}</PosterAuthor>
                                <DividedLine />
                                <PosterSubTitle>{poster.sub_title}</PosterSubTitle>
                                <ImageContainer>
                                    <Photos src={poster.image} alt={`pic ${idx + 1}`} />
                                </ImageContainer>
                            </PosterInner>
                            <PosterOverlay><ZoomInButton className={'override'} /></PosterOverlay>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </PosterContainer>
            <PosterPageOverlay onClick={event => handleOverlayClick(event)}/>
            <PdfContainer>
                <PdfInner />
                <CloseButton fontSize="large" onClick={event => handleClose(event)}/>
            </PdfContainer>
        </>
    )
}

export default PosterSwiper;