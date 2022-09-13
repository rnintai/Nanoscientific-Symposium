import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, IconButton } from '@mui/material';
import CommonModal from 'components/CommonModal/CommonModal';
import SpeakerCard from 'components/SpeakerCard/SpeakerCard';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

interface LocationChangerProps {
  openLocationChanger: boolean;
  setOpenLocationChanger: Dispatch<SetStateAction<boolean>>;
  setSpeakerSuccessAlert: Dispatch<SetStateAction<boolean>>;
    refreshFunction: () => void;
    speakersState: Speaker.speakerType[];
}

const LocationChanger = ({
    openLocationChanger,
  setOpenLocationChanger,
  setSpeakerSuccessAlert,
    refreshFunction,
  speakersState,
}: LocationChangerProps) => {

  const [loading, setLoading] = useState<boolean>(false);
    const [uploadLoading, setUploadLoading] = useState<boolean>(false);
    
    const handleClickUp = (idx: number) => {
        const l = JSON.parse(JSON.stringify(speakersState));// 배열을 카피하기 위함??

    const tmp = l[idx].id;
    l[idx].id = l[idx - 1].id;
    l[idx - 1].id = tmp;

    [l[idx], l[idx - 1]] = [l[idx - 1], l[idx]];
    // l = checkChangedOrder(l);
    // setPosterList(l);
  };
  const handleClickDown = (idx: number) => {
    const l = JSON.parse(JSON.stringify(speakersState));

    const tmp = l[idx].id;
    l[idx].id = l[idx + 1].id;
    l[idx + 1].id = tmp;

    [l[idx], l[idx + 1]] = [l[idx + 1], l[idx]];
    // l = checkChangedOrder(l);
    // setPosterList(l);
    };
    
    return (
        <CommonModal
            open={openLocationChanger}
            setOpen={setOpenLocationChanger}
            title="Change Location"
            desc="화살표를 눌러 변경해주세요"
            // onSubmit={speakerSubmitHandler}
            // submitDisabled={name.value === "" || imagePath === ""}
            loading={loading || uploadLoading}
        >
            {speakersState.map((speaker, idx) => (
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
                    disabled={idx === speakersState.length - 1}
                    onClick={() => {
                        handleClickDown(idx);
                    }}
                    >
                    <ArrowCircleDownIcon />
                    </IconButton>
                    <SpeakerCard
                        isAdmin
                        speaker={speaker}
                    />
              </Box>
            ))}
        </CommonModal>
    );
};

export default LocationChanger;

