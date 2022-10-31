import styled from "styled-components";
import { useTheme, Box } from "@mui/material";

interface ContainerType {
  unread: boolean;
}

export const RowContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const AnnouncementCardContainer = styled.div<ContainerType>`
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

  .title-text {
    ${(props) => {
      return props.unread ? null : `color: #ccc`;
    }}
  }

  .text-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    line-height: 1.5em;
    p > span,
    p > em,
    p > strong,
    p > a {
      ${(props) => {
        return props.unread ? null : `color: #ccc !important`;
      }}
    }
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
