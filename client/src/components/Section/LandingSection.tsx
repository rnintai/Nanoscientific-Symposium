/* eslint-disable react/require-default-props */
import React from "react";
import { LandingSectionContainer } from "./LandingSectionStyles";

interface LandingSectionProps extends React.ComponentPropsWithoutRef<"div"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  height?: string;
  fullWidth?: boolean;
  background?: string;
}
const LandingSection = (props: LandingSectionProps) => {
  const {
    children,
    fullWidth = false,
    height = "100%",
    background = null,
    ...rest
  } = props;

  return (
    <LandingSectionContainer
      {...rest}
      className={`${rest.className !== undefined ? ` ${rest.className}}` : ""}${
        fullWidth ? " fullWidth" : ""
      }`}
      style={{
        minHeight: height,
        height: "100%",
        backgroundImage: `${background ? `url(${background})` : "none"}`,
      }}
    >
      {children}
    </LandingSectionContainer>
  );
};
export default LandingSection;
