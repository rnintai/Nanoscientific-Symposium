import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import Loading from "components/Loading/Loading";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import SpeakerForm from "../Forms/SpeakerForm";
import { AdminSpeakerContainer } from "./AdminSpeakersStyles";

const AdminSpeakers = () => {
  const myCountry = "asia";

  const [openSpeakerForm, setOpenSpeakerForm] = useState<boolean>(false);

  const openSpeakerFormHandler = () => {
    setSelectedSpeaker(undefined);
    setEdit(false);
    setOpenSpeakerForm(true);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [speakersState, setSpeakersState] = useState<Speaker.speakerType[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker.speakerType>();
  const getSpeakers = async () => {
    setLoading(true);
    const speakers = await axios.get(`/api/page/${myCountry}/speakers`);
    setSpeakersState(speakers.data);
    setLoading(false);
  };
  useEffect(() => {
    getSpeakers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminSpeakerContainer>
      <AdminLayout
        title="Speakers"
        menu3="Add speaker"
        menu3ClickHandler={openSpeakerFormHandler}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 7 }}
            columns={{ xs: 1, sm: 8, md: 16 }}
          >
            {speakersState.map((speaker) => (
              <SpeakerCard
                onClick={() => {
                  setSelectedSpeaker(speaker);
                  setEdit(true);
                  setOpenSpeakerForm(true);
                }}
                isAdmin
                key={speaker.id}
                speaker={speaker}
              />
            ))}
          </Grid>
        </Box>
        {openSpeakerForm && (
          <SpeakerForm
            edit={edit}
            selectedSpeaker={selectedSpeaker as Speaker.speakerType}
            refreshFunction={getSpeakers}
            openSpeakerForm={openSpeakerForm}
            setOpenSpeakerForm={setOpenSpeakerForm}
          />
        )}
      </AdminLayout>
    </AdminSpeakerContainer>
  );
};

export default AdminSpeakers;
