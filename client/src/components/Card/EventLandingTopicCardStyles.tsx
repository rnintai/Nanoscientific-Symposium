import styled from "styled-components";

export const EventLandingTopicCardContainer = styled.div`
  width: 96%;
  padding: 30px 12px;
  min-height: 293px;
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
  img {
    width: 67px;
    margin-bottom: 14px;
  }

  .topic {
    font-size: 18px;
    // margin: 0 5px 25px 5px;
    margin-bottom: 10px;
    color: #283050;
    min-height: 54px;
  }
  .desc {
    font-size: 14px;
    color: #6a6e83;
  }

  @media screen and (max-width: 768px) {
    min-height: 300px;

    .topic {
      font-size: 14px;
      min-height: 42px;
    }
    .desc {
      font-size: 13px;
    }
  }
`;
