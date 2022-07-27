import styled from "styled-components";

export const PosterContainer = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
`;

export const PosterInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; // 변경
    align-items: center;
    background: #ffffff;
    text-align: center;
    cursor: pointer;
    padding: 20px 10px;
`;

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

export const PosterSubTitle = styled.div`
    font-size: 0.5rem;
    line-height: 1.2;
    margin: 8px 0;
`;

export const Photos = styled.img`
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-right: 0;
    -webkit-box-reflect: below 0.01px
    linear-gradient(transparent, transparent, #0006);
`;