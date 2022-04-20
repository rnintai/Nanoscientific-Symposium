import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { S3_URL } from "utils/GlobalData";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
}));

interface SpeakerCardProps {
  speaker: Speaker.speakerType;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const SpeakerCard = ({
  speaker,
  isAdmin = false,
  onClick,
}: SpeakerCardProps) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={2}
      sm={3}
      md={3}
      key={speaker.id}
      sx={{
        cursor: `${isAdmin ? "pointer" : "auto"}`,
        width: { tablet: "33.3%", mobile: "100%" },
      }}
      className={`${isAdmin ? "hover-zoom" : ""}`}
      onClick={onClick}
    >
      <Item className="speaker-card">
        {/* 같은 도메인의 백엔드 주소 가져오기 */}
        <Box sx={{ position: "relative" }}>
          <img
            className="speaker-image"
            src={`${S3_URL}/${speaker.image_path}`}
            alt="speakerImage"
          />
          <div className="overlay" />
        </Box>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          fontWeight={theme.typography.fontWeightBold}
          fontSize={subHeadingFontSize}
          sx={{
            marginTop: "5px",
            marginBottom: 0,
          }}
        >
          {speaker.name}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.text.primary}
          fontSize={mainFontSize}
          fontWeight={theme.typography.fontWeightMedium}
          style={{ margin: 0 }}
        >
          {speaker.belong}
        </Typography>
        {speaker.description && (
          <Typography
            sx={{ mt: 1 }}
            color={theme.palette.grey[600]}
            fontSize={xsmallFontSize}
          >
            {speaker.description}
          </Typography>
        )}
      </Item>
    </Grid>
  );
};

export default SpeakerCard;
