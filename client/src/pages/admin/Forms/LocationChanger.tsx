import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import CommonModal from "components/CommonModal/CommonModal";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import usePageViews from "hooks/usePageViews";

interface LocationChangerProps {
  openLocationChanger: boolean;
  setOpenLocationChanger: Dispatch<SetStateAction<boolean>>;
  setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
  refreshFunction: () => void;
  speakersState: Speaker.speakerType[];
}

interface adminSpeakerType extends Speaker.speakerType {
  isChanged: boolean;
}

const LocationChanger = ({
  openLocationChanger,
  setOpenLocationChanger,
  setSpeakerSuccessAlert,
  refreshFunction,
  speakersState,
}: LocationChangerProps) => {
  const pathname = usePageViews();
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [applyOrderLoading, setApplyOrderLoading] = useState<boolean>(false);

  const [speakerList, setSpeakerList] = useState<adminSpeakerType[]>([]);
  const [originalSpeakerList, setOriginalSpeakerList] = useState<
    adminSpeakerType[]
  >([]);
  const [openChangingOrderModal, setOpenChangingOrderModal] =
    useState<boolean>(false);
  const [disableApplyBtn, setDisableApplyBtn] = useState<boolean>(true);

  const config = {
    params: {
      nation: pathname,
    },
  };
  const getSpeakers = async () => {
    try {
      setLoading(true);
      const speakers = await axios.get(`/api/page/common/speakers`, config);
      setSpeakerList(speakers.data);
      setOriginalSpeakerList(speakers.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // speaker 순서 변경 여부 탐지
  const checkChangedOrder = (newList: adminSpeakerType[]) => {
    let changedCnt = 0;
    const updatedList = [...newList];
    for (let i = 0; i < updatedList.length; i += 1) {
      if (
        originalSpeakerList[i].name !== updatedList[i].name ||
        originalSpeakerList[i].image_path !== updatedList[i].image_path
      ) {
        updatedList[i].isChanged = true;
        originalSpeakerList[i].isChanged = true;
        changedCnt += 1;
      } else {
        updatedList[i].isChanged = false;
        originalSpeakerList[i].isChanged = false;
      }
    }
    if (changedCnt > 0) {
      setDisableApplyBtn(false);
    } else {
      setDisableApplyBtn(true);
    }
    return updatedList;
  };

  const handleClickUp = (idx: number) => {
    let l = JSON.parse(JSON.stringify(speakerList)); // 배열을 카피하기 위함??

    const tmp = l[idx].id;
    l[idx].id = l[idx - 1].id;
    l[idx - 1].id = tmp;

    [l[idx], l[idx - 1]] = [l[idx - 1], l[idx]];
    l = checkChangedOrder(l);
    setSpeakerList(l);
  };
  const handleClickDown = (idx: number) => {
    let l = JSON.parse(JSON.stringify(speakerList));

    const tmp = l[idx].id;
    l[idx].id = l[idx + 1].id;
    l[idx + 1].id = tmp;

    [l[idx], l[idx + 1]] = [l[idx + 1], l[idx]];
    l = checkChangedOrder(l);
    setSpeakerList(l);
  };

  const handleApplyOrder = async () => {
    const changed = [];
    let speakerResult;
    speakerList.forEach((p) => {
      if (p.isChanged) {
        changed.push(p);
      }
    });
    try {
      setApplyOrderLoading(true);
      speakerResult = await axios.post("/api/page/common/speakers/list", {
        nation: pathname,
        list: changed,
      });

      setOpenChangingOrderModal(false);
      getSpeakers();
    } catch (err) {
      alert(err);
    } finally {
      if (speakerResult.data.success) {
        setApplyOrderLoading(false);
        setOpenLocationChanger(false);
        setSpeakerSuccessAlert(true);
        refreshFunction();
      }
    }
    setDisableApplyBtn(true);
  };

  useEffect(() => {
    getSpeakers();
  }, []);

  return (
    <CommonModal
      open={openLocationChanger}
      setOpen={setOpenLocationChanger}
      title="Change Speaker's Location"
      desc="화살표를 눌러 변경해주세요"
      onSubmit={() => {
        setOpenChangingOrderModal(true);
      }}
      submitDisabled={disableApplyBtn}
      loading={applyOrderLoading}
      submitText="Apply Changed Orders"
    >
      {speakerList.map((speaker, idx) => (
        <Box
          key={`${speaker.id}`}
          sx={{
            mb: 1,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            disabled={idx === 0}
            onClick={() => {
              handleClickUp(idx);
            }}
          >
            <ArrowCircleUpIcon />
          </IconButton>
          <IconButton
            disabled={idx === speakerList.length - 1}
            onClick={() => {
              handleClickDown(idx);
            }}
          >
            <ArrowCircleDownIcon />
          </IconButton>
          <SpeakerCard isAdmin speaker={speaker} />
        </Box>
      ))}
      {openChangingOrderModal && (
        <CommonModal
          title="Changing an order"
          open={openChangingOrderModal}
          setOpen={setOpenChangingOrderModal}
          onSubmit={handleApplyOrder}
          submitText="apply"
          loading={applyOrderLoading}
        >
          <Stack flexDirection="row" alignItems="center">
            <Stack sx={{ width: "48%" }}>
              <Typography fontWeight={600}>&lt;Before&gt;</Typography>
              {originalSpeakerList.map((speaker, idx) => (
                <Box
                  key={`${speaker.id}`}
                  sx={{
                    mb: 1,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 1,
                      textAlign: "left",
                      transition: "all 0.3s ease-in-out",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    color={
                      speaker.isChanged
                        ? theme.palette.primary.dark
                        : theme.palette.common.black
                    }
                    fontWeight={speaker.isChanged ? 700 : 400}
                  >
                    {idx + 1}. {speaker.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <ArrowRightAltIcon sx={{ color: theme.palette.grey[600] }} />
            <Stack sx={{ width: "48%" }}>
              <Typography fontWeight={600}>&lt;After&gt;</Typography>
              {speakerList.map((speaker, idx) => (
                <Box
                  key={`${speaker.id}`}
                  sx={{
                    mb: 1,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 1,
                      textAlign: "left",
                      transition: "all 0.3s ease-in-out",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    color={
                      speaker.isChanged
                        ? theme.palette.primary.dark
                        : theme.palette.common.black
                    }
                    fontWeight={speaker.isChanged ? 700 : 400}
                  >
                    {idx + 1}. {speaker.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </CommonModal>
      )}
    </CommonModal>
  );
};

export default LocationChanger;
