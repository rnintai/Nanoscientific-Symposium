import styled from "styled-components";
import { useTheme } from "@mui/material";

export const ThumbnailCardContainer = styled.div`
  // min-width: 270px;
  width: 270px;
  margin-right: 30px;
  background-color: white;
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .desc {
    padding: 16px 0 0 0;
    padding-bottom: 0 !important;
    display: flex;
    flex-direction: column;
  }

  // .tag-container {
  //   overflow-x: auto;

  //   &::-webkit-scrollbar,
  //   textarea::-webkit-scrollbar {
  //     display: none;
  //   }
  // }

  .affiliation {
    min-height: 36px;
  }
`;
