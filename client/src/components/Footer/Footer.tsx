import { Stack, Typography, useTheme } from "@mui/material";
import usePageViews from "hooks/usePageViews";
import React from "react";
import { smallFontSize, xsmallFontSize } from "utils/FontSize";
import { FooterContainer } from "./FooterStyles";

const Footer = () => {
  const theme = useTheme();
  const pathname = usePageViews();

  return (
    <FooterContainer>
      <Stack maxWidth="230px" margin="0 auto">
        <a
          className="privacy-policy"
          href="https://parksystems.com/con/privacy-cookie-policy"
          target="_blank"
          rel="noreferrer"
        >
          <Typography component="div" fontWeight={600} fontSize={smallFontSize}>
            Privacy &amp; Cookie Policy
          </Typography>
        </a>
        <Typography
          fontSize={xsmallFontSize}
          fontWeight={700}
          color={theme.palette.grey[500]}
        >
          © {new Date().getFullYear()} NANOscientific{" "}
          {pathname === "eu" ? "Forum" : "Symposium"}
        </Typography>
      </Stack>
    </FooterContainer>
  );
};

export default Footer;
