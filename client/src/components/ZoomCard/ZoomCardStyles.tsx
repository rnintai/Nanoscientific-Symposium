import styled from "styled-components";

export const ZoomCardContainer = styled.div`
  &.invalid-zoom-card.hide {
    display: none;
  }
  width: 450px;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
  .MuiCardHeader-content.css-1qbkelo-MuiCardHeader-content {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 260px;
    margin-right: 0px;
  }
`;
