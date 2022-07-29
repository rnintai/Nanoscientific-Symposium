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
import { PosterContainer, Photos, PosterInner, PosterTitle, PosterAuthor, PosterSubTitle, DividedLine, ImageContainer, PosterOverlay, MagnifyIcon, PdfContainer, PdfInner } from './PosterSwipterStyle';

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
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleClick(index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // window.open(`https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`, "_blank");
        setIsVisible(true);
        setPdfUrl(`https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/poster_${index + 1}.pdf`);
    }

    const onPageClick = ({ pageNumber }) => {
        alert('Clicked an item from page ' + pageNumber + '!')
    }

    const handleMouseOverEvent = (e) => {
        e.preventDefault();
        // setIsHovering(1)
        const hoveredEl = e.target.parentElement;
        
        if(!hoveredEl.classList.contains(".swiper-slide-active")){ // 왜 안걸러지지???
            console.log(`가운데가 아닌 객체들 on MouseOver`);
            let resultArr = hoveredEl.style.transform.split(' ');
            resultArr.push('translateY(-80px)');
            resultArr = resultArr.join(' ');
            hoveredEl.style.transform = resultArr;
        }
    };

    const handleMouseOutEvent = (e) => {
        e.preventDefault();
        // setIsHovering(1)
        const hoveredEl = e.target.parentElement;
        
        if(!hoveredEl.classList.contains(".swiper-slide-active")){ // 왜 안걸러지지???
            console.log(`가운데가 아닌 객체들 on MouseOut`);
            let resultArr = hoveredEl.style.transform.split(' ');
            console.log(resultArr);
            resultArr.pop();
            resultArr = resultArr.join(' ');
            hoveredEl.style.transform = resultArr;
        }
    };

    return (
        <PosterContainer>
            <Swiper
                slideToClickedSlide={true}
                // {...swiperSetting}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                // navigation={{
                //     prevEl: prevRef.current, // 이전 버튼
                //     nextEl: nextRef.current, // 다음 버튼
                // }}
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
                on={{
                    init: function(){
                        console.log('init');
                    },
                    click: () => console.log('clicked'),
                    // tab: () => console.log('clicked'),
                }}
                className="mySwiper"
            >
                {posterState.map((poster, idx) => (
                    <SwiperSlide className="swiperSlide" onMouseOver={handleMouseOverEvent} onMouseOut={handleMouseOutEvent}>
                        <PosterInner>
                            <PosterTitle>{poster.title}</PosterTitle>
                            <PosterAuthor>{poster.author}</PosterAuthor>
                            <DividedLine />
                            <PosterSubTitle>{poster.sub_title}</PosterSubTitle>
                            <ImageContainer>
                                <Photos src={poster.image} alt={`pic ${idx + 1}`} />
                            </ImageContainer>
                        </PosterInner>
                        <PosterOverlay><MagnifyIcon className={'override'} /></PosterOverlay>
                        <PdfContainer isVsb={isVisible}>
                            <PdfInner src={pdfUrl}/>
                        </PdfContainer>
                    </SwiperSlide>
                ))}
            </Swiper>
        </PosterContainer>
    )
}

export default PosterSwiper;

{/*onClick={(e) => { handleClick(idx, e) }}*/}


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


/* <Document 
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
</p> */