import React from "react";
import { NSSButtonContainer } from "./NSSButtonStyles";

interface NSSButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  variant: "gradient" | "primary" | "secondary";
}
const NSSButton = (props: NSSButtonProps) => {
  const { children, variant, ...rest } = props;

  return (
    <NSSButtonContainer
      type="button"
      {...rest}
      className={
        rest.className !== undefined
          ? `${variant} ${rest.className}`
          : `${variant}`
      }
    >
      {children}
    </NSSButtonContainer>
  );
};
export default NSSButton;
