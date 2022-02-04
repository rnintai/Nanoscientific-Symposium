import styled from "styled-components";

export const AsiaProgramsContainer = styled.div`


  /* https://d25unujvh7ui3r.cloudfront.net/css/program.css */

  .program-wrap {
    padding-top: 120px;
  }

  .cbp_tmtimeline {
    margin: 30px 0 0 0;
    padding: 0;
    list-style: none;
    position: relative;
  }

  /* The line */

  .cbp_tmtimeline:before {
    content: "";
    position: absolute;
    top: 20px;
    bottom: 0;
    width: 4px;
    background: #fff;
    left: 19.9%;
    margin-top: 20px;
    margin-left: -10px;
  }


  /* Download button */

  .download-btn {
    position: relative;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 0;
    margin: 10px 0 30px 0;

    font-size: 18px;
    letter-spacing: 3px;
    font-weight: 700;
    color: white;

    background-color: #21ade5;
    border: 3px solid white;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #00000024;

    cursor: pointer;
  }

  /* Example Media Queries */
  @media screen and (max-width: 65.375em) {
    .cbp_tmtimeline > li .cbp_tmtime span:last-child {
      font-size: 1em;
    }
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
    
    

  }

`