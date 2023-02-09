/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  // Pagination
} from "@mui/material";
import Pagination from "react-js-pagination";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { smallFontSize, xsmallFontSize } from "utils/FontSize";
import { adminRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NSSButton from "components/Button/NSSButton";
import OnDemandForm from "pages/admin/Forms/OnDemandForm";
import useQuery from "hooks/useQuery";
import OnDemandFilter from "components/OnDemandFilter/OnDemandFilter";
import ThumbnailCard from "components/ThumbnailCard/ThumbnailCard";
import { OnDemandContainer } from "./OnDemandStyles";

const itemPerPage = 6;

const OnDemand = () => {
  const theme = useTheme();
  const authState = useAuthState();
  const isAdmin = adminRole.includes(authState.role);
  const navigate = useNavigate();
  const { search } = useLocation();

  // 현재 페이지
  const query = useQuery();

  const [page, setPage] = useState(1); // useState 적용
  const [allFilter, setAllFilter] = useState([]);
  const [videoList, setVideoList] = useState<Common.onDemandVideoType[]>([]);

  const [totalCount, setTotalCount] = useState(1);
  const [videoListLoading, setVideoListLoading] = useState<boolean>(false);

  const [filterList, setFilterList] = useState<Common.onDemandTagType[]>([]);

  const [yearList, setYearList] = useState<any[]>([]);

  const [regionList, setRegionList] = useState<any[]>([]);

  const [languageList, setLanguageList] = useState<any[]>([]);

  const [applicationList, setApplicationList] = useState<any[]>([]);

  // loading
  const [getOnDemandAllFilterLoading, setGetOnDemandAllFilterLoading] =
    useState<boolean>(true);

  // admin state
  const [edit, setEdit] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] =
    useState<Common.onDemandVideoType>(null);

  useEffect(() => {
    let mounted = true; // 마운트 여부 체크
    if (mounted) {
      // mounted 상태일때
      setPage(Number(query.get("page")) ? Number(query.get("page")) : 1);
      getOnDemandAllFilter();
    }
    return (): void => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    getOnDemandAllFilter();
    getOndemandPageList();
    setPage(Number(query.get("page")) ? Number(query.get("page")) : 1);
  }, [search]);

  useEffect(() => {
    handleActive();
  }, [allFilter]);

  const getOnDemandAllFilter = async () => {
    try {
      setGetOnDemandAllFilterLoading(true);
      const res = await axios.get("/api/ondemand/filter/list");
      setYearList(
        res.data.year.map((v) => {
          return { type: "year", value: v };
        }),
      );
      setRegionList(
        res.data.region.map((v) => {
          return { type: "region", value: v };
        }),
      );
      setLanguageList(
        res.data.language.map((v) => {
          return { type: "language", value: v };
        }),
      );
      setApplicationList(
        res.data.application.map((v) => {
          return { type: "application", value: v };
        }),
      );
      setAllFilter(res.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setGetOnDemandAllFilterLoading(false);
    }
  };

  const getOndemandPageList = async () => {
    try {
      setVideoListLoading(true);
      const res = await axios.get(`/api/ondemand/page/list${search}`);
      setVideoList(res.data.result);
      // 페이지 넘어간후 필터 클릭했을때 아무것도 안뜨는거 방지
      if (res.data.totalCount <= itemPerPage) handlePageChange(1);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setVideoListLoading(false);
    }
  };

  // queryString에서 현재 필터값 추출
  const handleActive = () => {
    const newFilterList = [];
    if (query.get("year")) {
      query
        .get("year")
        .split(",")
        .map((m) => {
          newFilterList.push({ type: "year", value: m });
        });
    }
    if (query.get("region")) {
      query
        .get("region")
        .split(",")
        .map((m) => newFilterList.push({ type: "region", value: m }));
    }
    if (query.get("language")) {
      query
        .get("language")
        .split(",")
        .map((m) => newFilterList.push({ type: "language", value: m }));
    }
    if (query.get("application")) {
      query
        .get("application")
        .split(",")
        .map((m) => newFilterList.push({ type: "application", value: m }));
    }
    // 일단 태그에 active 모두 삭제 => 초기화
    document.querySelectorAll(`.tag`).forEach((e) => {
      e.classList.remove("active");
    });
    if (newFilterList) {
      newFilterList.map((m) => {
        return handleAddFilter(null, m);
      });
    }
    setFilterList(newFilterList);
  };

  // filterValue에 현재 눌린값 넣어준후 바로 쿼리에 set 후 navigate하는 메소드
  const handleAddTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: Common.onDemandTagType,
  ) => {
    let newFilterValue = [];
    newFilterValue = query.get(`${t.type}`)
      ? query.get(`${t.type}`).split(",")
      : [];
    if (newFilterValue.indexOf(`${t.value}`) === -1)
      newFilterValue.push(`${t.value}`);
    else newFilterValue.splice(newFilterValue.indexOf(`${t.value}`), 1);
    query.set(`${t.type}`, newFilterValue.join(","));
    query.set("page", String(page));
    query.set("itemPerPage", String(itemPerPage));

    navigate(`?${query.toString()}`);
  };

  const handleAddFilter = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: Common.onDemandTagType,
  ) => {
    const tagRef = document.querySelector(
      `.tag.tag-${t.type}-${t.value.replace(/\s/g, "-")}`,
    );
    if (tagRef !== null) {
      tagRef.classList.add("active");
    }
  };

  const handleClearFilter = () => {
    // filterList를 빈 리스트로 대체.
    setFilterList([]);
    navigate("");
  };

  // admin
  // ondemand video 추가 버튼 handler
  const addVideoHandler = () => {
    setEdit(false);
    setOpenEditModal(true);
  };

  // 페이지 변경
  const handlePageChange = (page) => {
    query.set("page", page);
    query.set("itemPerPage", String(itemPerPage));
    navigate(`?${query.toString()}`);
  };

  return (
    <OnDemandContainer>
      <Stack
        className="on-demand-wrap"
        flexDirection="row"
        justifyContent="center"
      >
        {/* control panel */}
        <Stack className="control-panel" sx={{ p: "8px 12px" }}>
          <Box className="selected-filters">
            <Stack direction="row" justifyContent="space-between">
              <Typography
                fontSize={xsmallFontSize}
                color={theme.palette.grey[600]}
                mb="5px"
              >
                Selected Filters
              </Typography>
              <Typography
                component="button"
                className="clear-btn"
                fontSize={xsmallFontSize}
                color={theme.palette.grey[600]}
                mb="5px"
                onClick={handleClearFilter}
              >
                Clear
              </Typography>
            </Stack>
            {/* selected filter List */}
            <Stack mb={1} direction="row" flexWrap="wrap">
              {filterList.length === 0 ? (
                <Typography
                  color={theme.palette.grey[400]}
                  fontSize={smallFontSize}
                >
                  None
                </Typography>
              ) : (
                filterList.map((f) => (
                  <Typography
                    key={`selected-tag-${f.type}-${f.value}`}
                    className="tag selected"
                    // sx={{ cursor: "default !important" }}
                    onClick={() => {
                      handleAddTag(null, f);
                    }}
                    mb="10px"
                  >
                    {f.value} &times;
                  </Typography>
                ))
              )}
            </Stack>
          </Box>
          <hr className="dashed" />
          <Typography
            fontSize={xsmallFontSize}
            color={theme.palette.grey[600]}
            sx={{ mt: 1 }}
          >
            Filters
          </Typography>
          <Stack className="filter-wrap">
            <OnDemandFilter
              label="Year"
              filterList={yearList}
              selectedFilter={filterList.filter((f) => f.type === "year")}
              handleClick={handleAddTag}
            />
            <hr className="dashed" />
            <OnDemandFilter
              label="Region"
              filterList={regionList}
              selectedFilter={filterList.filter((f) => f.type === "region")}
              handleClick={handleAddTag}
            />
            <hr className="dashed" />
            <OnDemandFilter
              label="Language"
              filterList={languageList}
              selectedFilter={filterList.filter((f) => f.type === "language")}
              handleClick={handleAddTag}
            />
            <hr className="dashed" />
            <OnDemandFilter
              label="Application"
              filterList={applicationList}
              selectedFilter={filterList.filter(
                (f) => f.type === "application",
              )}
              handleClick={handleAddTag}
            />
          </Stack>
        </Stack>
        {/* videos */}
        <Stack alignItems="center">
          <Typography
            fontSize={xsmallFontSize}
            color={theme.palette.grey[600]}
            className="result-total-text"
            mb={1}
          >
            {totalCount} results
          </Typography>
          <Grid className="video-result" maxHeight="660px" overflow="auto">
            {getOnDemandAllFilterLoading &&
              new Array(6)
                .fill(null)
                .map(() => <ThumbnailCard key="skeleton" loading />)}
            {!getOnDemandAllFilterLoading &&
              videoList.map((v, idx) => (
                <ThumbnailCard
                  key={`card-${v.id}`}
                  video={v}
                  getList={getOndemandPageList}
                  setSelected={setSelectedVideo}
                  setOpenModal={setOpenEditModal}
                  edit={edit}
                  setEdit={setEdit}
                />
              ))}

            {/* {filteredVideoList.map((v, idx) => (
              <ThumbnailCard
                key={`card-${v.id}`}
                video={v}
                getList={getOnDemandList}
                setSelected={setSelectedVideo}
                setOpenModal={setOpenEditModal}
                edit={edit}
                setEdit={setEdit}
              />
            ))} */}
            {isAdmin && (
              <Box
                // width="270px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <NSSButton variant="icon" onClick={addVideoHandler}>
                  <AddCircleOutlineIcon />
                </NSSButton>
              </Box>
            )}
          </Grid>

          <Pagination
            activePage={Number(page)}
            itemsCountPerPage={itemPerPage}
            totalItemsCount={totalCount}
            pageRangeDisplayed={2}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </Stack>
      </Stack>
      {openEditModal && (
        <OnDemandForm
          open={openEditModal}
          setOpen={setOpenEditModal}
          edit={edit}
          selected={selectedVideo}
          getList={getOndemandPageList}
        />
      )}
    </OnDemandContainer>
  );
};

export default OnDemand;
