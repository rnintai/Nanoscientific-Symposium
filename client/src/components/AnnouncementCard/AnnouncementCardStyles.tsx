import styled from "styled-components";
import { useTheme, Typography, Box } from "@mui/material";

export const RowContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const ReadContainer = styled(Typography)`
  color: red;
`;

export const AnnouncementCardContainer = styled.div`
  margin-bottom: 30px;

  .card-wrap {
    height: 270px;
    .ann-thumb {
      width: 45%;
      border-right: 1px solid
        ${() => {
          const theme = useTheme();
          return theme.palette.grey.A200;
        }};
    }
    .desc-section {
      padding: 20px;
      width: 55%;
    }
  }

  .text-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    line-height: 1.5em;
  }

  @media screen and (max-width: 768px) {
    .card-wrap {
      height: 400px;
      .ann-thumb {
        width: 100%;
        height: 40%;
        border-right: none;
        border-bottom: 1px solid
          ${() => {
            const theme = useTheme();
            return theme.palette.grey.A200;
          }};
      }

      .desc-section {
        width: 100%;
        height: 60%;
      }
    }
  }
`;
