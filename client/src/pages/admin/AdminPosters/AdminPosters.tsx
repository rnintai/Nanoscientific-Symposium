import { Box, CircularProgress, Stack } from "@mui/material";
import axios from "axios";
import AdminLayout from "components/AdminLayout/AdminLayout";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import PosterForm from "../Forms/PosterForm";

const AdminPosters = () => {
  const pathname = usePageViews();
  //
  const [posterList, setPosterList] = useState<Poster.posterType[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<Poster.posterType>(null);

  const [openPosterForm, setOpenPosterForm] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  // loading
  const [getPosterListLoading, setGetPosterListLoading] =
    useState<boolean>(false);
  // snackbar
  const [editPosterFailed, setEditPosterFailed] = useState<boolean>(false);
  const [deletePosterFailed, setDeletePosterFailed] = useState<boolean>(false);

  const getPosterList = async () => {
    try {
      setGetPosterListLoading(true);
      const res = await axios.get(`/api/page/common/poster?nation=${pathname}`);
      setPosterList(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setGetPosterListLoading(false);
    }
  };

  useEffect(() => {
    getPosterList();
  }, []);

  return (
    <>
      <AdminLayout
        title="Posters"
        menus={[
          {
            name: "Add Poster",
            clickHandler: () => {
              setSelectedPoster(undefined);
              setEdit(false);
              setOpenPosterForm(true);
            },
          },
        ]}
      >
        {getPosterListLoading && <CircularProgress size="20px" />}
        <Stack alignItems="flex-start">
          {!getPosterListLoading &&
            posterList.map((poster) => (
              <Box
                component="button"
                key={`${poster.id}`}
                onClick={() => {
                  setSelectedPoster(poster);
                  setEdit(true);
                  setOpenPosterForm(true);
                }}
                sx={{ mb: 1, textAlign: "left" }}
              >
                {poster.id}. {poster.title}
              </Box>
            ))}
        </Stack>
        {openPosterForm && (
          <PosterForm
            open={openPosterForm}
            setOpen={setOpenPosterForm}
            selected={selectedPoster}
            edit={edit}
            setApplyFailed={setEditPosterFailed}
            setDeleteFailed={setDeletePosterFailed}
          />
        )}
      </AdminLayout>
      <TopCenterSnackBar
        value={editPosterFailed}
        setValue={setEditPosterFailed}
        variant="filled"
        severity="error"
        content="Failed to add/edit a poster."
      />
      <TopCenterSnackBar
        value={deletePosterFailed}
        setValue={setDeletePosterFailed}
        variant="filled"
        severity="error"
        content="Failed to delete a poster."
      />
    </>
  );
};

export default AdminPosters;
