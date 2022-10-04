/* eslint-disable react/require-default-props */
import { CircularProgress, Typography, useTheme } from "@mui/material";
import Loading from "components/Loading/Loading";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { NSSButtonContainer, AlarmMark } from "./NSSButtonStyles";

interface NSSButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  variant: "gradient" | "primary" | "secondary" | "icon";
  loading?: boolean;
  disabled?: boolean;
  fontSize?: any;
  fontWeight?: any;
  letterSpacing?: string;
  isMoreverIcon?: boolean;
  markAnnouncementAlarm?: boolean;
}
const NSSButton = (props: NSSButtonProps) => {
  const {
    children,
    variant,
    loading,
    disabled,
    fontSize,
    fontWeight,
    letterSpacing,
    isMoreverIcon,
    markAnnouncementAlarm,
    ...rest
  } = props;
  let className =
    rest.className !== undefined
      ? `${variant} ${rest.className}`
      : `${variant}`;
  className += disabled ? " disabled" : "";
  className += loading ? " disabled loading" : "";
  const theme = useTheme();
  return (
    <NSSButtonContainer type="button" {...rest} className={className}>
      {isMoreverIcon && markAnnouncementAlarm ? <AlarmMark /> : null}
      {loading ? (
        <CircularProgress className="loading" size="22px" />
      ) : (
        <Typography
          fontSize={fontSize || mainFontSize}
          fontWeight={fontWeight || theme.typography.fontWeightMedium}
          letterSpacing={letterSpacing || "inherit"}
        >
          {children}
        </Typography>
      )}
    </NSSButtonContainer>
  );
};
export default NSSButton;
