import styled from "styled-components";
import { useTheme } from "@mui/material";

export const OnDemandContainer = styled.div`
  padding: 80px 40px;

  // control panel
  .control-panel {
    width: 300px;
    border-radius: 3px;
    border: 1px solid #ececec;
    align-self: baseline;
    min-height: 100px;
    margin-right: 100px;
    .dot-indicator {
      width: 5px;
      height: 5px;
      background-color: #dc4040;
      border-radius: 50px;
    }
    .tag {
      font-size: 0.8rem;
      cursor: pointer;
      padding: 2px 10px;
      border-radius: 30px;
      background-color: #21ade5bf;
      color: white;
      white-space: nowrap;
      margin-right: 5px;
      opacity: 0.6;
      display: inline-block;
      transition: all 0.2s ease-in-out;

      &.selected {
        opacity: 1;
      }
      &:hover,
      &.active {
        opacity: 1;
      }
    }

    hr.dashed:last-child {
      display: none;
    }
  }

  .video-result {
    width: 1000px;
  }
`;
