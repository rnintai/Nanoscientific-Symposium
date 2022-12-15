/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import {
  Button,
  Input,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useInput from "hooks/useInput";
import S3Upload from "components/S3Upload/S3Upload";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useNavigate } from "react-router";
import useAdminStore from "store/AdminStore";

interface SponsorFormProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sectionNo: string;
  edit?: boolean;
  selectedSponsor?: Landing.landing7Type;
  sponsorList: Landing.landing7Type[];
  setIsSponsorPreview: Dispatch<SetStateAction<boolean>>;
  setPreviewSponsorList: React.Dispatch<
    React.SetStateAction<Landing.landing7Type[]>
  >;
  year?: string;
}

const SponsorForm = ({
  open,
  setOpen,
  sectionNo,
  edit,
  selectedSponsor,
  sponsorList,
  setIsSponsorPreview,
  setPreviewSponsorList,
  year,
  ...rest
}: SponsorFormProps) => {
  const pathname = usePageViews();
  const navigate = useNavigate();
  const sponsorName = useInput(selectedSponsor ? selectedSponsor.name : "");
  const sponsorURL = useInput(selectedSponsor ? selectedSponsor.url : "");
  const [sponsorHeight, setSponsorHeight] = useState<number>(
    selectedSponsor ? selectedSponsor.height : 80,
  );
  const [sponsorImagePath, setSponsorImagePath] = useState<string>(
    selectedSponsor ? selectedSponsor.image_path : "",
  );
  const [previewImagePath, setPreviewImagePath] = useState<string>(
    selectedSponsor ? selectedSponsor.image_path : "",
  );
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const sponsorSubmitHandler = async () => {
    setUploadLoading(true);
    try {
      if (edit) {
        await axios.put(`/api/page/common/landing/7`, {
          nation: pathname,
          sectionNo,
          id: selectedSponsor.id,
          name: sponsorName.value,
          url: sponsorURL.value,
          imagePath: sponsorImagePath,
          height: sponsorHeight,
        });
      } else {
        await axios.post(`/api/page/common/landing/7`, {
          nation: pathname,
          sectionNo,
          name: sponsorName.value,
          url: sponsorURL.value,
          imagePath: sponsorImagePath,
          height: sponsorHeight,
          year,
        });
      }
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setUploadLoading(false);
  };

  const deleteHandler = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/page/common/landing/7`, {
        params: {
          nation: pathname,
          id: selectedSponsor.id,
          sectionNo,
        },
      });
      setOpen(false);
      navigate(0);
    } catch (err) {
      alert(err);
    }
    setDeleteLoading(false);
  };

  const handleBlur = () => {
    if (sponsorHeight < 0) {
      setSponsorHeight(0);
    } else if (sponsorHeight > 200) {
      setSponsorHeight(200);
    }
  };

  const handlePreview = () => {
    setIsSponsorPreview(true);
    setOpen(false);
    const newSponsorList = JSON.parse(JSON.stringify(sponsorList));
    if (edit) {
      let currentIdx = -1;
      newSponsorList.map((e, i) => {
        if (e.id === selectedSponsor.id) currentIdx = i;
        return e.id === selectedSponsor.id;
      });

      newSponsorList[currentIdx].name = sponsorName.value;
      newSponsorList[currentIdx].image_path = sponsorImagePath;
      newSponsorList[currentIdx].url = sponsorURL.value;
      newSponsorList[currentIdx].height = sponsorHeight;
    } else {
      newSponsorList.push({
        id: 9999,
        name: sponsorName.value,
        image_path: sponsorImagePath,
        url: sponsorURL.value,
        height: sponsorHeight,
      });
    }

    setPreviewSponsorList(newSponsorList);
  };

  const handleHeightReset = () => {
    setSponsorHeight(selectedSponsor.height);
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      submitText="Apply"
      onSubmit={sponsorSubmitHandler}
      submitDisabled={sponsorImagePath === ""}
      loading={deleteLoading || uploadLoading}
      title={edit ? `Edit a supporter` : "Add a supporter"}
      deleteHandler={edit && deleteHandler}
    >
      <TextField
        label="Name"
        fullWidth
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        {...sponsorName}
      />
      <TextField
        label="URL"
        margin="dense"
        variant="filled"
        sx={{ marginBottom: "15px" }}
        fullWidth
        {...sponsorURL}
      />
      <Typography fontWeight={600}>Height?</Typography>
      <Stack direction="row" spacing={2}>
        <Slider
          sx={{ width: "100px" }}
          value={sponsorHeight}
          onChange={(event: Event, newValue: number) => {
            setSponsorHeight(newValue);
          }}
          step={0.1}
          min={0.1}
          max={200}
          aria-label="Height?"
          valueLabelDisplay="auto"
        />
        <Input
          value={sponsorHeight}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSponsorHeight(
              event.target.value === "" ? 0 : Number(event.target.value),
            );
          }}
          onBlur={handleBlur}
          inputProps={{
            step: 0.1,
            min: 0.1,
            max: 200,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        <Button onClick={handlePreview} variant="contained">
          Preview
        </Button>
        <Button onClick={handleHeightReset} variant="outlined">
          Reset
        </Button>
      </Stack>
      <S3Upload
        setImagePath={setSponsorImagePath}
        edit={edit}
        previewURL={previewImagePath}
        setPreviewURL={setPreviewImagePath}
        setUploadLoading={setUploadLoading}
        uploadPath="sponsor"
      />
    </CommonModal>
  );
};

export default SponsorForm;
