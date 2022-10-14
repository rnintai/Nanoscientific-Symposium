import styled from "styled-components";

export const ZoomCardContainer = styled.div`
  &.invalid-zoom-card.hide {
    display: none;
  }
  width: 450px;
  margin: 0 10px 20px 10px;
  position: relative;
  .MuiCardHeader-content.css-1qbkelo-MuiCardHeader-content {
    width: 100%;
  }

  .live-icon {
    font-size: 8px;
    letter-spacing: 3px;
    color: white;
    font-weight: 600;
    background-color: red;
    padding: 0 5px 0 7px;
    border-radius: 7px;
    text-align: center;
    margin-bottom: 4px;
    transition: opacity 0.3s;

    &.off {
      opacity: 0.1;
      transition: opacity 0.3s;
    }
  }

  @media (max-width: 768px) {
    width: 270px;
    margin-right: 0px;
  }
`;
