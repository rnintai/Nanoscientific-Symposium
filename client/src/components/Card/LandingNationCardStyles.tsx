import styled from "styled-components";

export const LandingNationCardContainer = styled.button`
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  text-align: center;

  margin-bottom: 15px;
  @media screen and (min-width: 0px) {
    width: 100%;
    &:not(:nth-child(3n)) {
      margin-right: 0;
    }
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 23%;
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
    &:not(:nth-child(3n)) {
      margin-right: 50px;
    }
  }
`;
