import styled from "styled-components";

export const ResetPasswordContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 100px 30px;

  .speaker-image {
    object-fit: cover;
    margin-bottom: 20px;
  }

  .belong {
    color: #7c7c7c;
  }

  .half-width {
    width: 49%;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 100px 20px;

    .half-width {
      width: 100%;
    }
  }
`;
