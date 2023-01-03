import styled from "styled-components";
import { useTheme } from "@mui/material";

export const OnDemandContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: 80px 40px;

  // control panel
  .control-panel {
    min-width: 250px;
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

  .result-total-text {
    align-self: flex-end;
  }

  .video-result {
    width: 1000px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 315px));
    grid-gap: 20px;
  }

  @media screen and (max-width: 1350px) {
    .on-demand-wrap {
      flex-direction: column;
    }
    .control-panel {
      margin: 0;
      margin-bottom: 60px;
      align-self: center;
      .filter-wrap {
        flex-direction: row;
        flex-wrap: wrap;
        .on-demand-filter {
          max-width: 150px;
          &:not(:last-child) {
            margin-right: 10px;
          }

          .tag {
            &:not(:last-child) {
              margin-bottom: 5px;
            }
          }
        }
        hr.dashed {
          display: none;
        }
      }
    }
    .video-result {
      max-width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(180px, auto));
    }
  }
  @media screen and (max-width: 499px) {
    .video-result {
      // justify-content: center;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #337ab7;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
