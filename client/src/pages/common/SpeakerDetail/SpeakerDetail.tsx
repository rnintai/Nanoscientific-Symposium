import { Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import Loading from "components/Loading/Loading";
import SpeakerImage from "components/SpeakerImage/SpeakerImage";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import InnerHTML from "dangerously-set-html-content";
import { SpeakerDetailContainer } from "./SpeakerDetailStyles";

interface speakerDataType {
  id: number;
  name: string;
  title: string;
  image_path: string;
  belong: string;
  description: string;
}

const SpeakerDetail = () => {
  const { id } = useParams();
  const pathname = usePageViews();
  const theme = useTheme();

  const [speakerData, setSpeakerData] = useState<speakerDataType>(null);
  const [speakerLoading, setSpeakerLoading] = useState<boolean>(true);

  const getSpeakerDetailById = () => {
    setSpeakerLoading(true);
    axios
      .get(`/api/page/common/speakers/detail?nation=${pathname}&id=${id}`)
      .then((res) => setSpeakerData(res.data.result[0]))
      .catch((err) => console.log(err))
      .finally(() => {
        setSpeakerLoading(false);
      });
  };

  useEffect(() => {
    getSpeakerDetailById();
  }, []);

  return (
    <SpeakerDetailContainer className="layout body-fit">
      {speakerLoading && <Loading />}
      {!speakerLoading && (
        <Stack>
          <Stack direction="row" spacing={4} mb={2}>
            <SpeakerImage src={speakerData.image_path} alt={speakerData.name} />
            <Stack>
              <Typography fontSize={subHeadingFontSize} mb={2}>
                {speakerData.name}:{" "}
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  {speakerData.title}
                </span>
              </Typography>
              <Typography fontSize={mainFontSize}>
                {speakerData.belong}
              </Typography>
            </Stack>
          </Stack>
          <Typography fontSize={smallFontSize} lineHeight={1.7}>
            <InnerHTML html={speakerData.description} />
          </Typography>
        </Stack>
      )}
    </SpeakerDetailContainer>
  );
};

export default SpeakerDetail;
