import styled from "styled-components";

interface TitleContainerProps {
  fontSize: number;
}

export const TitleContainer = styled.div<TitleContainerProps>`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  h1 {
    color: #0e3c7a;
    font-family: "Roboto", Sans-serif;
    font-size: ${(props) => props.fontSize}px;
    font-weight: 800;
  }
`;
