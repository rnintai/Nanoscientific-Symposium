/* eslint-disable react/require-default-props */
import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import Loading from "components/Loading/Loading";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { NSSButtonContainer, AlarmMark } from "./NSSButtonStyles";
import { useAlarmState } from "../../context/NavBarMarkContext";

interface NSSButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  variant: "gradient" | "primary" | "secondary" | "icon";
  loading?: boolean;
  disabled?: boolean;
  fontSize?: any;
  fontWeight?: any;
  letterSpacing?: string;
  isMoreverIcon?: boolean;
  startIcon?: JSX.Element | JSX.Element[] | string | string[];
  // markAnnouncementAlarm?: boolean;
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
    startIcon,
    // markAnnouncementAlarm,
    ...rest
  } = props;
  let className =
    rest.className !== undefined
      ? `${variant} ${rest.className}`
      : `${variant}`;

  const alarmState = useAlarmState();
  className += disabled ? " disabled" : "";
  className += loading ? " disabled loading" : "";
  const theme = useTheme();
  return (
    <NSSButtonContainer type="button" {...rest} className={className}>
      {isMoreverIcon && alarmState.alarm ? <AlarmMark /> : null}
      {loading ? (
        <CircularProgress className="loading" size="22px" />
      ) : (
        <Stack direction="row" alignItems="center">
          {startIcon}
          <Typography
            fontSize={fontSize || mainFontSize}
            fontWeight={fontWeight || theme.typography.fontWeightMedium}
            letterSpacing={letterSpacing || "inherit"}
            ml={startIcon ? 0.5 : 0}
          >
            {children}
          </Typography>
        </Stack>
      )}
    </NSSButtonContainer>
  );
};
export default NSSButton;
