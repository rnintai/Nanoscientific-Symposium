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
import {PosterContainer, Photos, PosterInner, PosterTitle, PosterAuthor, PosterSubTitle} from './PosterSwipterStyle';

// pdfjs
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

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

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
    }

    function handleClick(index: number, e: React.MouseEvent<HTMLImageElement, MouseEvent>)
    {
        window.open(`https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`,"_blank");
    }

    const onPageClick = ({ pageNumber }) => {
        alert('Clicked an item from page ' + pageNumber + '!')
    }
    
    // useEffect(() => {
    //     if (!swiperSetting) {
    //         setSwiperSetting({
    //             spaceBetween: 0,
    //             Navigation: {
    //                 prevEl: prevRef.current, // 이전 버튼
    //                 nextEl: nextRef.current, // 다음 버튼
    //             },
    //             // scrollbar: { draggable: true, el: null },
    //             // cardList: ReactElement[],
    //             slidesPerView: 3 | 4,
    //             loop: true,
    //             effect: "coverflow",
    //             grabCursor: true,
    //             centeredSlides: true,
    //             pagination: { clickable: true, dynamicBullets: true },
    //             coverflowEffect: {
    //                 rotate: 5,
    //                 stretch: 10,
    //                 depth: 300, // 가운데 제외 모두 들어가는 깊이
    //                 modifier: 2, // 가운데 모이는 정도(0: 사이간격 안겹침)
    //                 slideShadows: true,
    //             },
    //             breakPoints: {
    //                 700: {
    //                     spaceBetween: 0,
    //                     slidesPerView: 4,
    //                 },
    //                 500: {
    //                     spaceBetween: 100,
    //                     slidesPerView: 2,
    //                 },
    //                 411: {
    //                     spaceBetween: 100,
    //                     slidesPerView: 2,
    //                 },
    //                 300: {
    //                     spaceBetween: 0,
    //                     slidesPerView: 1,
    //                 },
    //             }
    //         })
    //     }
    // }, []);

    return (
        <PosterContainer>
            <Swiper
                // {...swiperSetting}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                // navigation={{
                //     prevEl: prevRef.current, // 이전 버튼
                //     nextEl: nextRef.current, // 다음 버튼
                // }}
                navigation={true}
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
                    slideShadows: true,
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
            >
                {posterState.map((poster, idx) => (
                    <SwiperSlide>
                        <PosterInner>
                        <PosterTitle>{poster.title}</PosterTitle>
                        <PosterAuthor>{poster.author}</PosterAuthor>
                        <PosterSubTitle>{poster.sub_title}</PosterSubTitle>
                        <Photos src={poster.image} alt={`pic ${idx + 1}`} onClick={(e) => {handleClick(idx, e)}}/>
                        </PosterInner>
                    </SwiperSlide>
                ))}
                {/* <Document 
                file="https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_1.pdf" 
                // onLoadSuccess={onDocumentLoadSuccess}
                onItemClick={onPageClick}
                options={option}
                >
                    <Page pageNumber={pageNumber} onClick={() => console.log('hi')}/>
                </Document>
                <p>
                    <span onClick={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : null}>
                        &lt;
                    </span>
                    <span onClick={() => pageNumber < numPages ? setPageNumber(pageNumber + 1) : null}>
                        &gt;
                    </span>
                </p> */}
            </Swiper>
        </PosterContainer>
    )
}

export default PosterSwiper;