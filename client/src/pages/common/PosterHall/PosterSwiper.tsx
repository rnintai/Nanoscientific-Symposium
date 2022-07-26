import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, EffectCoverflow, Navigation } from "swiper";

// import "swiper/swiper.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/effect-coverflow/effect-coverflow.sss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {PosterContainer, Photos} from './PosterSwipterStyle';

type posterProps = {
    posterState: Poster.posterType[];
}

SwiperCore.use([Pagination, EffectCoverflow, Navigation]);

const PosterSwiper = ({ posterState }: posterProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [swiperSetting, setSwiperSetting] = useState<any | null>(null); // any -> Swiper

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
                navigation={{
                    prevEl: prevRef.current, // 이전 버튼
                    nextEl: nextRef.current, // 다음 버튼
                }}
                loop={true}
                pagination={{ clickable: true, dynamicBullets: true }}
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
                        <Photos src={poster.image} alt={`pic ${idx + 1}`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </PosterContainer>
    )
}

export default PosterSwiper;