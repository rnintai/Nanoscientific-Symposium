/* eslint-disable react/require-default-props */
import { CircularProgress, Typography } from "@mui/material";
import Loading from "components/Loading/Loading";
import React from "react";
import { NSSButtonContainer } from "./NSSButtonStyles";

interface NSSButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  variant: "gradient" | "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}
const NSSButton = (props: NSSButtonProps) => {
  const { children, variant, loading, disabled, ...rest } = props;
  let className =
    rest.className !== undefined
      ? `${variant} ${rest.className}`
      : `${variant}`;
  className += disabled ? " disabled" : "";
  return (
    <NSSButtonContainer type="button" {...rest} className={className}>
      {loading ? (
        <CircularProgress size="24px" />
      ) : (
        <Typography>{children}</Typography>
      )}
    </NSSButtonContainer>
  );
};
export default NSSButton;
