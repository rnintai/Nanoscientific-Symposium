import styled from "styled-components";
import IconButton from '@mui/material/IconButton';

export const PosterTitle = styled.div`
    display: flex;
    align-items: center;
    line-height: 1.1;
    background-color: #1d2088;
    color: #fff;
    padding: 9px 5px;
    text-overflow: ellipsis;
    margin-bottom: 5px;
    overflow: hidden;
    max-height: 64px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-family: 'Noto Serif', serif;
    font-weight: 700;
    position: relative;
`;

export const PosterAuthor = styled.div`
    font-size: 0.625rem;
`;

export const DividedLine = styled.div`
    width: 100%;
    min-height: 3px;
    background: linear-gradient(45deg, transparent, #1d2088, transparent);
`;

export const PosterSubTitle = styled.div`
    font-size: 0.5rem;
    line-height: 1.2;
    margin: 8px 0;
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
    max-height: 310px;
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
`;

export const StyledButton = styled(IconButton)`
    position: absolute;
    cursor: pointer;

    &.zoomIn{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 22px;
}

    &.close{
        left: 50%;
        transform: translateX(-50%);
        bottom: -8%;
        color: rgba(32,33,36,0.6);
        &:hover{
            color: rgba(32,33,36,0.8);
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

    &.is--open{
        visibility: visible;
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
    padding: 20px 10px;
    /* -webkit-box-reflect: below 0.01px */
    /* linear-gradient(transparent, transparent, #0006); */
    box-shadow: 0px 5px 11px #9fb4d4cf;
`;

export const PosterContainer = styled.div`
    min-height: calc(100vh - 64px - 110px);
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;

    .swiper-button-prev,
    .swiper-button-next{
        color: #1D2088; 
    }
    font-family: 'Noto Serif', serif;

    .mySwiper{
        height: 100%;
        padding: 72px 0;
    }

    .swiper-slide.swiper-slide-active {
        /* pointer-events: auto; */
        &:hover{
            ${PosterOverlay}{
                opacity: 1;
            }
        }
    }
    .swiper-slide:not(.swiper-slide-active){
        /* pointer-events: none; */
        &:hover{
            ${PosterOverlay}{
                opacity: 0;
            };
        }
    }
`;

export const PosterPageOverlay = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: black;
    visibility: hidden;
    opacity: 0.5;

    &.is--open{
        visibility: visible;
    }
`;