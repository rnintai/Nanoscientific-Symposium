import React from "react";
import { Link } from "react-router-dom";

import { GradientLinkContainer } from "./GradientLinkStyles";

interface GradientLinkProps {
  to: string;
  text: string;
}
const GradientLink = ({ to, text }: GradientLinkProps) => {
  return (
    <GradientLinkContainer>
      <Link to={to}>{text}</Link>
    </GradientLinkContainer>
  );
};
export default GradientLink;
