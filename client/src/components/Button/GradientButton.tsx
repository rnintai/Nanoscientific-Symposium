import React from "react";
import { GradientButtonContainer } from "./GradientButtonStyles";

interface GradientButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
}
const GradientButton = (props: GradientButtonProps) => {
  const { children, ...rest } = props;
  return (
    <GradientButtonContainer type="button" {...rest}>
      {children}
    </GradientButtonContainer>
  );
};
export default GradientButton;
