import styled from "styled-components";

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
    cursor: pointer;
    padding: 20px 10px;
    /* -webkit-box-reflect: below 0.01px */
    /* linear-gradient(transparent, transparent, #0006); */
    box-shadow: 0px 5px 11px #9fb4d4cf;

    &:hover{  
        /*
        background: #000000;
        opacity: 0.9;

        ${PosterTitle} {
            opacity: 0.9;
        }

        ${DividedLine} {
            opacity: 0.9;
        }

        ${ImageContainer} {
            opacity: 0.9;
        }
        
        ${PosterOverlay}{
            opacity: 1;
        }
        */
    }
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

    .swiper{
        height: 580px;
    }

    .swiper-slide{
        &:hover{
            ${PosterOverlay}{
                opacity: 1;
            }
        }
    }
`;