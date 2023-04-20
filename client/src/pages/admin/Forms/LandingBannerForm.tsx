/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import { TextField } from "@mui/material";
import useInput from "hooks/useInput";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";
import S3Upload from "components/S3Upload/S3Upload";
import useAdminStore from "store/AdminStore";
import { escapeQuotes } from "utils/String";

interface LandingBannerFormProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected?: Landing.landingBannerType;
  year?: string;
}

const LandingBannerForm = ({
  open,
  setOpen,
  selected,
  year,
  ...rest
}: LandingBannerFormProps) => {
  const pathname = usePageViews();
  const { currentLanguage } = useAdminStore();
  const navigate = useNavigate();
  const date = useInput(selected.date);
  const desc = useInput(selected.desc);
  // const logo = useInput(selected.logo);
  const venue = useInput(selected.venue);
  const [showRegister, setShowRegister] = useState<boolean>(
    selected.show_register === 1,
  );

  const [imagePath, setImagePath] = useState<string>(selected.background);
  const [previewImagePath, setPreviewImagePath] = useState<string>(
    selected.background,
  );

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setUploadLoading(true);
    try {
      await axios.post(`/api/page/common/landing/banner`, {
        nation: pathname,
        year,
        language: pathname === "china" ? currentLanguage : undefined,
        date: escapeQuotes(date.value),
        desc: escapeQuotes(desc.value),
        // logo: logo.value,
        venue: escapeQuotes(venue.value),
        background: imagePath,
      });
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setUploadLoading(false);
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      submitText="Apply"
      onSubmit={handleSubmit}
      loading={uploadLoading}
      title="Edit a button"
    >
      <TextField
        label="Date"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...date}
      />
      <TextField
        label="Description"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...desc}
      />
      {/* <TextField
        label="Logo"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...logo}
      /> */}
      <TextField
        label="Venue"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...venue}
      />
      <S3Upload
        setImagePath={setImagePath}
        edit
        previewURL={previewImagePath}
        setPreviewURL={setPreviewImagePath}
        setUploadLoading={setUploadLoading}
        uploadPath="landing"
      />
    </CommonModal>
  );
};

export default LandingBannerForm;
