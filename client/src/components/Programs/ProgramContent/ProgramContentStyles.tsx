import styled from "styled-components";

export const ProgramContentContainer = styled.div<{ isAdmin: boolean }>`
  position: relative;
  cursor: ${(props) => props.isAdmin && "pointer"};
  .cbp_tmtime {
    display: block;
    width: 25%;
    padding-right: 15rem;
    position: absolute;
  }

  li {
    position: relative;

    span:last-child {
      position: relative;
      top: 2rem;
      font-size: 1.2em;
      font-weight: 600;
    }

    /* card margin */

    .cbp_tmlabel {
      border-left: 4px solid #009fe8;
      margin: 0 0 20px 25%;
      background: #fff;
      color: #000;
      padding: 1.2em;
      font-size: 1.2em;
      font-weight: 300;
      line-height: 1.2;

      position: relative;
    }

    &:nth-child(odd) {
      .cbp_tmlabel {
        background: #fff;
        border-left: 4px solid #009fe8;
      }

      .cbp_tmlabel:after {
        border-right-color: #009fe8;
      }
    }

    /* The triangle */

    .cbp_tmlabel:after {
      right: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-right-color: #009fe8;
      border-width: 20px;
      top: 16px;
    }

    /* The icons */

    .cbp_tmicon {
      width: 30px;
      height: 30px;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      font-size: 1.4em;
      line-height: 40px;
      -webkit-font-smoothing: antialiased;
      position: absolute;
      color: #fff;
      background: #009fe8;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #fff;
      text-align: center;
      left: 20%;
      top: 20px;
      margin: 0 0 0 -25px;
    }

    .session-date {
      font-size: 1.4em;
      font-weight: 600;
      color: #009fe8;
      line-height: 1.1;
    }

    .content-time {
      font-size: 1.2em;
      font-weight: 600;
      color: #009fe8;
    }

    .timezone {
      font-size: 14px;
    }

    //for admin page UX
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(${(props) => props.isAdmin && "-10px"});
    }
  }

  li.cbp_tmlabel {
    h2 {
      margin-top: 0px;
      padding: 0 0 10px 0;
      border-bottom: 0px solid rgba(255, 255, 255, 0.4);
    }

    p {
      margin-top: 0px;
      padding: 0 0 30px 0;
      border-bottom: 0px solid rgba(255, 255, 255, 0.4);
    }
  }
  .timezone,
  li .cbp_tmtime span {
    display: block;
    text-align: right;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    .cbp_tmicon {
      display: none;
    }

    .cbp_tmlabel::after {
      display: none;
    }

    .cbp_tmtimeline:before {
      display: none;
    }

    li {
      .cbp_tmtime {
        width: 100%;
        position: relative;
        padding: 0 0 20px 0;

        span {
          text-align: left;
          display: inline-block;
        }

        .session-date {
          font-size: 1.2em;
          margin-right: 5px;
        }
      }

      .timezone {
        text-align: left;
        display: inline-block;
        padding-left: 10px;
      }

      .cbp_tmlabel {
        margin: 0 0 0 0;
        padding: 1em;
        font-weight: 400;
        font-size: 95%;

        &:after {
          right: auto;
          left: 20px;
          border-right-color: transparent;
          border-bottom-color: #009fe8;
          top: -20px;
        }
      }

      &:nth-child(odd) {
        .cbp_tmlabel:after {
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left: 4px solid #009fe8;
        }
      }

      .cbp_tmicon {
        position: relative;
        float: right;
        left: auto;
        margin: -55px 5px 0 0px;
      }
    }
  }

  //이거 안하면 원에 글자가 겹쳐짐
  @media screen and (max-width: 1300px) {
    .cbp_tmtime {
      display: block;
      width: 25%;
      padding-right: 100px;
      position: absolute;
    }
  }
`;
