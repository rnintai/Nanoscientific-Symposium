import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  padding-top: 10px;
  background-color: #54595f;
  text-align: center;
  position: absolute;

  .privacy-policy {
    color: white;
  }

  .nss {
    color: #d3d3d3;
    margin-bottom: 0px;
  }
`;

export const FooterIconContainer = styled.ul`
  margin: 0 auto;
  width: 15%;
  display: flex;
  justify-content: space-evenly;
  font-size: 30px;
  list-style: none;
`;
