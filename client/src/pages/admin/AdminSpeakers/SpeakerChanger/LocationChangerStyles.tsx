import styled from "styled-components";
import { SpeakerProps } from "./LocationChanger";

export const ArrowButtonContainer = styled.div`
  margin-bottom: 70px;
  display: flex;
`;
export const SpeakerRowContainer = styled.div<SpeakerProps>`
  .speaker-card > h6 {
    transition: all 0.3s ease-in-out;
    color: ${(props) => (props.isActive ? "#189cd1" : "#000")};
  }
  .speaker-card .overlay {
    display: none;
  }
`;
export const SpeakersContainer = styled.div`
  margin: 4rem 0;
`;
