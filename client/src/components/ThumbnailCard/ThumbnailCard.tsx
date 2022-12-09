/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
  xsmallFontSize,
} from "utils/FontSize";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import NSSButton from "components/Button/NSSButton";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { adminRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import EditOnDemandForm from "pages/admin/Forms/OnDemandForm";
import { ThumbnailCardContainer } from "./ThumbnailCardStyles";

interface ThumbnailCardProps {
  video: Common.onDemandVideoType;
  getList: () => void;
}

const ThumbnailCard = (props: ThumbnailCardProps) => {
  const { video, getList } = props;
  const theme = useTheme();
  const authState = useAuthState();

  // state
  const [isLoading, setIsLoading] = useState<boolean>(false); // 실제 화면에 보여지고 있는지 여부를 확인
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  // ref
  const imgRef = React.useRef<HTMLImageElement>(null); // 이미지 태그 요소
  const observer = React.useRef<IntersectionObserver>(); // IntersectionObserver 변수

  // useEffect
  React.useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver); // 인스턴스 생성
    observer.current.observe(imgRef.current); // 이미지 태그 관찰 시작
  }, []);

  // IntersectionObserver 설정
  const intersectionOberserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰되고 있는 entry가 보여지게 된 다면
        io.unobserve(entry.target); // 관찰 종료
        setIsLoading(true); // 로딩 체크
      }
    });
  };

  const isAdmin = adminRole.includes(authState.role);

  // let startX;
  // let scrollLeft;
  // const dragSensitivity = 0.5;
  // let dragFlag = false;

  // const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const slider = event.currentTarget;
  //   startX = event.pageX - slider.offsetLeft;

  //   scrollLeft = slider.scrollLeft;
  //   dragFlag = true;
  // };
  // const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (dragFlag) {
  //     const slider = event.currentTarget;
  //     const x = event.pageX - slider.offsetLeft;
  //     const walk = (x - startX) * dragSensitivity;
  //     slider.scrollLeft = scrollLeft - walk;
  //   }
  // };
  // const handleDragEnd = (event: React.MouseEvent<HTMLDivElement>) => {
  //   dragFlag = false;
  // };

  const detailClickHandler = () => {
    setOpenDetailModal(true);
  };

  const editClickHandler = () => {
    setOpenEditModal(true);
  };

  return (
    <ThumbnailCardContainer>
      <Box sx={{ position: "relative" }}>
        <Card
          sx={{
            mb: 3,
            visibility: isLoading ? "visible" : "hidden",
          }}
          elevation={0}
        >
          <Box
            className="content-wrap"
            onClick={() => {
              window.location.href = `/on-demand/${video.id}`;
            }}
          >
            <CardMedia
              component="img"
              image={video.thumbnail}
              ref={imgRef}
              // className="hover-zoom"
            />
            <CardContent
              className="desc"
              sx={{ padding: "16px 0 0 0", pb: "0 !important" }}
            >
              <Typography
                component="span"
                title={video.title}
                className="ellipsis title"
                fontSize={mainFontSize}
                fontWeight={700}
              >
                {video.title}
              </Typography>
              {/* {video.speaker_page ? (
                <Typography
                  component="a"
                  href={video.speaker_page}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p0 hover-blue"
                  fontSize={xsmallFontSize}
                  fontWeight={500}
                  color={theme.palette.grey[600]}
                >
                  {video.speaker}
                </Typography>
              ) : ( */}
              <Typography
                component="span"
                className="p0"
                fontSize={xsmallFontSize}
                fontWeight={500}
                color={theme.palette.grey[600]}
              >
                {video.speaker}
              </Typography>
              {/* )} */}
              <Typography
                component="span"
                className="ellipsis affiliation"
                title={video.affiliation}
                fontSize={xsmallFontSize}
                color={theme.palette.grey[500]}
              >
                {video.affiliation}
              </Typography>
              {/* <Stack
              className="tag-container"
              component="div"
              flexDirection="row"
              sx={{ mt: "4px" }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {video.tag.map((t) => (
                <Typography
                  className="tag noselect"
                  component="div"
                  fontSize={xsmallFontSize}
                  color={theme.palette.grey[600]}
                  onClick={() => {
                    handleClickTag(t);
                  }}
                >
                  {t}
                </Typography>
              ))}
            </Stack> */}
            </CardContent>
          </Box>

          {isAdmin && (
            <NSSButton
              variant="gradient"
              fontSize={xsmallFontSize}
              style={{ position: "absolute" }}
              startIcon={<EditIcon sx={{ fontSize: "0.9em" }} />}
              onClick={editClickHandler}
            >
              Edit
            </NSSButton>
          )}
          <NSSButton
            variant="gradient"
            fontSize={xsmallFontSize}
            style={{ marginLeft: "auto" }}
            onClick={detailClickHandler}
          >
            Detail
          </NSSButton>
        </Card>
        <Card
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            mb: 2,
            display: isLoading ? "none" : "flex",
          }}
          elevation={0}
        >
          <Skeleton variant="rectangular" width={169.5} height={95} />
          <Box sx={{ width: "40%", padding: "0 10px" }}>
            <Skeleton variant="text" sx={{ fontSize: mainFontSize }} />
            <Skeleton variant="text" sx={{ fontSize: xsmallFontSize }} />
          </Box>
        </Card>
      </Box>
      {/* modal */}
      {openDetailModal && (
        <Dialog
          open={openDetailModal}
          onClose={() => {
            setOpenDetailModal(false);
          }}
          fullWidth
          maxWidth="laptop"
        >
          <button
            type="button"
            style={{
              position: "absolute",
              right: "8px",
              top: "0px",
              fontSize: "1.6em",
            }}
            onClick={() => {
              setOpenDetailModal(false);
            }}
          >
            &times;
          </button>
          <DialogContent sx={{ padding: "45px 24px" }}>
            <Stack>
              <Stack direction="row">
                <img src={video.thumbnail} alt={`thumb-${video.id}`} />
                <Stack ml={1}>
                  <Typography
                    fontSize={smallFontSize}
                    className="ellipsis"
                    fontWeight={600}
                  >
                    {video.title}
                  </Typography>
                  <Typography
                    fontSize={xsmallFontSize}
                    color={theme.palette.grey[600]}
                  >
                    {video.speaker}
                  </Typography>
                  <Typography
                    fontSize={xsmallFontSize}
                    color={theme.palette.grey[600]}
                    mb={1}
                  >
                    {video.affiliation}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="40%"
                    flexWrap="wrap"
                  >
                    <Typography
                      fontSize={xsmallFontSize}
                      color={theme.palette.grey[600]}
                      width="45%"
                    >
                      Year: {video.year}
                    </Typography>
                    <Typography
                      fontSize={xsmallFontSize}
                      color={theme.palette.grey[600]}
                      width="45%"
                    >
                      Region: {video.region}
                    </Typography>
                    <Typography
                      fontSize={xsmallFontSize}
                      color={theme.palette.grey[600]}
                      width="45%"
                    >
                      Language: {video.language}
                    </Typography>
                    <Typography
                      fontSize={xsmallFontSize}
                      color={theme.palette.grey[600]}
                      width="45%"
                    >
                      Application:
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <hr style={{ borderStyle: "dashed", color: "#ececec" }} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                window.location.href = `/on-demand/${video.id}`;
              }}
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "rgb(239 250 255)",
                },
              }}
              startIcon={<OndemandVideoIcon />}
            >
              Watch a Video
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openEditModal && (
        <EditOnDemandForm
          open={openEditModal}
          setOpen={setOpenEditModal}
          selected={video}
          getList={getList}
        />
      )}
    </ThumbnailCardContainer>
  );
};

export default ThumbnailCard;
