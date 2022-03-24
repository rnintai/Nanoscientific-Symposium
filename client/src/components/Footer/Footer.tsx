import React from "react";
import { FooterContainer, FooterIconContainer } from "./FooterStyles";

const Footer = () => {
  return (
    <FooterContainer>
      <a className="privacy-policy" href="/" target="_blank">
        Privacy & Cookie Policy
      </a>

      <h5 className="nss">© 2022 NanoScientific Symposium </h5>

      <FooterIconContainer>
        <li className="elementor-icon-list-item elementor-inline-item">
          <a href="https://www.facebook.com/nanoscien">
            {" "}
            <span className="elementor-icon-list-icon">
              <i aria-hidden="true" className="fab fa-facebook-f" />{" "}
            </span>
            <span
              className="elementor-icon-list-text elementor-inline-editing"
              data-elementor-setting-key="icon_list.0.text"
            />
          </a>
        </li>
        <li className="elementor-icon-list-item elementor-inline-item">
          <a href="https://twitter.com/NanoscientificC">
            {" "}
            <span className="elementor-icon-list-icon">
              <i aria-hidden="true" className="fab fa-twitter" />{" "}
            </span>
            <span
              className="elementor-icon-list-text elementor-inline-editing"
              data-elementor-setting-key="icon_list.1.text"
            />
          </a>
        </li>
        <li className="elementor-icon-list-item elementor-inline-item">
          <a href="https://www.linkedin.com/company/nanoscientific-conferences/?viewAsMember=true">
            {" "}
            <span className="elementor-icon-list-icon">
              <i aria-hidden="true" className="fab fa-linkedin" />{" "}
            </span>
            <span
              className="elementor-icon-list-text elementor-inline-editing"
              data-elementor-setting-key="icon_list.2.text"
            />
          </a>
        </li>
      </FooterIconContainer>
    </FooterContainer>
  );
};

export default Footer;
