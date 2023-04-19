import axios from "axios";
import NSSButton from "components/Button/NSSButton";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCookies } from "react-cookie";
import OnDemandLoginModal from "components/Modal/OnDemandLoginModal";
import { useAuthState } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { OnDemandVideoContainer } from "./OnDemandVideoStyles";

const OnDemandVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] =
    useState<Common.onDemandVideoType>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const { isLogin } = useAuthState();
  //
  const [cookies, setCookie, removeCookie] = useCookies([
    "isSubmittedOnDemand",
  ]);

  const checkUser = () => {
    if (cookies.isSubmittedOnDemand === "true" || isLogin) {
      setOpenLoginModal(false);
      getOnDemandVideo();
    } else {
      setOpenLoginModal(true);
    }
  };

  const setOnDemandCookie = () => {
    const expireDate = new Date();
    expireDate.setDate(new Date().getDate() + 90);

    setCookie("isSubmittedOnDemand", "true", {
      expires: expireDate,
    });
  };

  const getOnDemandVideo = async () => {
    try {
      const res = await axios.get(`/api/ondemand/${id}`);
      setCurrentVideo(res.data.result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [isLogin]);
  return (
    <>
      <OnDemandVideoContainer className="layout body-fit">
        <ArrowBackIcon
          className="btn-alpha"
          onClick={() => {
            navigate(-1);
          }}
        />
        {/* </Link> */}
        {currentVideo && (
          <YoutubeEmbed url={currentVideo.video} width="960px" height="540px" />
        )}
      </OnDemandVideoContainer>
      {openLoginModal && (
        <OnDemandLoginModal
          open={openLoginModal}
          setOpen={setOpenLoginModal}
          callback={checkUser}
          setLoginSuccess={setLoginSuccess}
          setLoginFailed={setLoginFailed}
        />
      )}
      <TopCenterSnackBar
        value={loginSuccess}
        setValue={setLoginSuccess}
        variant="filled"
        severity="success"
        content="Successfully signed in."
      />
      <TopCenterSnackBar
        value={loginFailed}
        setValue={setLoginFailed}
        variant="filled"
        severity="error"
        content="User info not matched."
      />
    </>
  );
};

export default OnDemandVideo;
