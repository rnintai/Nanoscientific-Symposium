import styled from "styled-components";

interface TitleContainerProps {
  fontSize: number;
}

export const TitleContainer = styled.div<TitleContainerProps>`
  width: 100%;
  text-align: center;

  h1 {
    color: #2a4b5a;
    font-family: "Roboto", Sans-serif;
    font-size: ${(props) => props.fontSize}px;
    font-weight: 800;
  }
`;
