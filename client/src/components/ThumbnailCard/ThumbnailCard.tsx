/* eslint-disable react/require-default-props */
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
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
import { Link } from "react-router-dom";
import { ThumbnailCardContainer } from "./ThumbnailCardStyles";

interface ThumbnailCardProps {
  video: Common.onDemandVideoType;
}

const ThumbnailCard = (props: ThumbnailCardProps) => {
  const { video } = props;
  const theme = useTheme();

  // state
  const [isLoading, setIsLoading] = React.useState<boolean>(false); // 실제 화면에 보여지고 있는지 여부를 확인

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
          <CardMedia
            component="img"
            image={video.thumbnail}
            ref={imgRef}
            sx={{ cursor: "pointer" }}
            className="hover-zoom"
            onClick={() => {
              window.location.href = `/on-demand/${video.id}`;
            }}
          />
          <CardContent
            className="desc"
            sx={{ padding: "16px 0 0 0", pb: "0 !important" }}
          >
            <Typography
              component="a"
              title={video.title}
              className="ellipsis p0 hover-blue"
              href={`/on-demand/${video.id}`}
              target="_blank"
              rel="noreferrer noopener"
              fontSize={mainFontSize}
              fontWeight={700}
            >
              {video.title}
            </Typography>
            {video.speaker_page ? (
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
            ) : (
              <Typography
                className="p0 hover-blue"
                fontSize={xsmallFontSize}
                fontWeight={500}
                color={theme.palette.grey[600]}
              >
                {video.speaker}
              </Typography>
            )}
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
    </ThumbnailCardContainer>
  );
};

export default ThumbnailCard;
