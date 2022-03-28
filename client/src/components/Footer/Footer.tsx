import { Stack } from "@mui/material";
import React from "react";
import { FooterContainer, FooterIconContainer } from "./FooterStyles";

const Footer = () => {
  return (
    <FooterContainer>
      <Stack maxWidth="230px" margin="0 auto">
        <FooterIconContainer>
          <a
            href="https://www.facebook.com/nanoscien"
            target="_blank"
            rel="noreferrer"
          >
            <i aria-hidden="true" className="fab fa-facebook-f" />
          </a>
          <a
            href="https://twitter.com/NanoscientificC"
            target="_blank"
            rel="noreferrer"
          >
            <i aria-hidden="true" className="fab fa-twitter" />
          </a>
          <a
            href="https://www.linkedin.com/company/nanoscientific-conferences/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
          >
            <i aria-hidden="true" className="fab fa-linkedin" />
          </a>
        </FooterIconContainer>
        <a className="privacy-policy" href="/" target="_blank">
          Privacy &amp; Cookie Policy
        </a>

        <h5 className="nss">
          © {new Date().getFullYear()} NanoScientific Symposium
        </h5>
      </Stack>
    </FooterContainer>
  );
};

export default Footer;
