import CommonModal from 'components/CommonModal/CommonModal';
import SpeakerCard from 'components/SpeakerCard/SpeakerCard';
import React, {Dispatch, SetStateAction, useEffect, useState } from "react";

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
            {speakersState.map((speaker) => (
                <SpeakerCard
                isAdmin
                key={speaker.id}
                speaker={speaker}
              />
            ))}
        </CommonModal>
    );
};

export default LocationChanger;

