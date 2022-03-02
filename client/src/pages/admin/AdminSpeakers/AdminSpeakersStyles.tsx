import styled from "styled-components";

export const AdminSpeakerContainer = styled.div`
  .speaker-grid {
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(-10px);
    }
    &:not(:nth-child(3n)) {
      margin-right: 50px;
    }

    .speaker-card {
      margin-bottom: 25px;
      min-height: calc(100% - 25px);
      align-items: center;

      .speaker-image {
        object-fit: cover;
        height: 300px;
        margin: 20px 0;
      }

      .belong {
        color: #7c7c7c;
      }
    }

    .belong {
      color: #7c7c7c;
    }
  }
`;
