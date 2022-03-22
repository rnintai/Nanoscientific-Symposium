import styled from "styled-components";

export const LandingNationCardContainer = styled.button`
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  text-align: center;

  margin-bottom: 30px;
  @media screen and (max-width: 1920px) {
    width: 20%;
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
    &:not(:nth-child(3n)) {
      margin-right: 120px;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 40%;
    &:not(:nth-child(3n)) {
      margin-right: 0;
    }
    &:not(:nth-child(2n)) {
      margin-right: 40px;
    }
  }
`;
