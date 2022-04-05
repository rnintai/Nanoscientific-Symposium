import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import Loading from "components/Loading/Loading";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import usePageViews from "hooks/usePageViews";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { SpeakersContainer } from "../../common/Speakers/SpeakersStyles";
import SpeakerForm from "../Forms/SpeakerForm";
import SpeakerHideForm from "../Forms/SpeakerHideForm";

const AdminSpeakers = () => {
  const pathname = usePageViews();

  const [openSpeakerForm, setOpenSpeakerForm] = useState<boolean>(false);
  const [openHideForm, setOpenHideForm] = useState<boolean>(false);

  const [speakerSuccessAlert, setSpeakerSuccessAlert] =
    useState<boolean>(false);

  // 스위치 상태
  const [hideToggle, setHideToggle] = useState<boolean>(false);
  // publish loading
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(false);
  // 현재 publish 상태
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // alert
  const [publishSuccessAlert, setPublishSuccessAlert] =
    useState<boolean>(false);

  const openSpeakerFormHandler = () => {
    setSelectedSpeaker(undefined);
    setEdit(false);
    setOpenSpeakerForm(true);
  };

  const openHideFormHandler = () => {
    setOpenHideForm(true);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [speakersState, setSpeakersState] = useState<Speaker.speakerType[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker.speakerType>();
  const config = {
    params: {
      nation: pathname,
    },
  };
  const getSpeakers = async () => {
    setLoading(true);
    const speakers = await axios.get(`/api/page/common/speakers`, config);
    setSpeakersState(speakers.data);
    setLoading(false);
  };

  const getIsAdmin = async () => {
    setIsAdminLoading(true);
    axios
      .post("/api/menu/admin", {
        nation: pathname,
        path: `/speakers`,
      })
      .then((res) => {
        setHideToggle(res.data.result);
        setIsPublished(res.data.result);
      })
      .catch((err) => {
        alert(`getIsAdmin ${err}`);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  };
  useEffect(() => {
    getSpeakers();
    getIsAdmin();
  }, []);

  const hideToggleHandler = () => {
    setIsAdminLoading(true);
    axios
      .put("/api/menu/admin", {
        path: "/speakers",
        nation: pathname,
        isPublished: hideToggle,
      })
      .then(() => {
        setIsPublished(hideToggle);
        setPublishSuccessAlert(true);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer>
      <AdminLayout
        title="Speakers"
        menu4="Add speaker"
        menu4ClickHandler={openSpeakerFormHandler}
        // menu2="Hidden Items"
        // menu2ClickHandler={openHideFormHandler}
        hideToggle={hideToggle}
        setHideToggle={setHideToggle}
        hideToggleHandler={hideToggleHandler}
        isHideLoading={isAdminLoading}
        isPublished={isPublished}
      >
        <Box className="layout body-fit" sx={{ flexGrow: 1 }}>
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
            setSpeakerSuccessAlert={setSpeakerSuccessAlert}
            selectedSpeaker={selectedSpeaker as Speaker.speakerType}
            refreshFunction={getSpeakers}
            openSpeakerForm={openSpeakerForm}
            setOpenSpeakerForm={setOpenSpeakerForm}
          />
        )}
        {openHideForm && (
          <SpeakerHideForm
            refreshFunction={getSpeakers}
            openHideForm={openHideForm}
            setOpenHideForm={setOpenHideForm}
          />
        )}
      </AdminLayout>
      <TopCenterSnackBar
        value={speakerSuccessAlert}
        setValue={setSpeakerSuccessAlert}
        severity="success"
        content="Success"
      />
      <TopCenterSnackBar
        value={publishSuccessAlert}
        setValue={setPublishSuccessAlert}
        severity="success"
        content="Publish state is successfully updated."
      />
    </SpeakersContainer>
  );
};

export default AdminSpeakers;
