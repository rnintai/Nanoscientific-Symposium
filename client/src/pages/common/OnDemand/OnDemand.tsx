<<<<<<< Updated upstream
/* eslint-disable array-callback-return */
=======
>>>>>>> Stashed changes
/* eslint-disable no-restricted-globals */
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  // Pagination
} from "@mui/material";
import Pagination from "react-js-pagination";
// npm install react-js-pagination
import { Box } from "@mui/system";
import axios from "axios";
<<<<<<< Updated upstream
import React, { useEffect, useMemo, useState } from "react";
=======
import React, { useEffect, useMemo, useState, useRef } from "react";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  const [isFirst, setIsFirst] = useState(false);
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const { search } = useLocation();

  // 현재 페이지
  const query = useQuery();
<<<<<<< Updated upstream
=======
  const filterRef = useRef();

  // const [page, setPage] = useState(query.get("page") ? query.get("page") : 1); // useState 적용
  const [page, setPage] = useState(1); // useState 적용

  const [AllFilterd, setAllFiltered] = useState([]);
  const [filterValue, setFilterValue] = useState({
    year: [],
    region: [],
    language: [],
    application: [],
  });
>>>>>>> Stashed changes

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

  // admin state
  const [edit, setEdit] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] =
    useState<Common.onDemandVideoType>(null);

<<<<<<< Updated upstream
=======
  // const [querystring, setQueryString] = useState(
  //   query.toString() ? query.toString() : "",
  // );

>>>>>>> Stashed changes
  useEffect(() => {
    let mounted = true; // 마운트 여부 체크
    if (mounted) {
      // mounted 상태일때
      setPage(Number(query.get("page")) ? Number(query.get("page")) : 1);
      getOnDemandAllFilter();
<<<<<<< Updated upstream
=======
      // getOndemandPageList();
      // // handleActive();

      console.log("filterList : ", filterList);
    } else {
      // setQueryString(query.toString());
>>>>>>> Stashed changes
    }
    return (): void => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("변경 : ", query.toString());
    getOnDemandAllFilter();
    getOndemandPageList();
<<<<<<< Updated upstream
    setPage(Number(query.get("page")) ? Number(query.get("page")) : 1);
  }, [search]);

  useEffect(() => {
    handleActive();
  }, [allFilter]);
=======
  }, [search]);

  // useEffect(() => {
  //   getOndemandPageList();
  // }, [search]);

  useEffect(() => {
    handleActive();
  }, [allFilter]);

  // useEffect(() => {
  //   console.log(filterList);
  // }, [filterList]);

  // useEffect(() => {
  //   console.log("3. search : ", search);
  //   // getOndemandPageList();
  //   handleActive();
  //   console.log("필터리스트", filterList);
  // }, [search]);

  // const ArrayToString = (target: any[]) => {
  //   return target.join(",");
  // };

  // const makeQuery = () => {
  //   const newQueryString = `?page=${page}&itemPerPage=${itemPerPage}&${
  //     filterValue.year ? `year=${filterValue.year}` : ""
  //   }&${filterValue.region ? `region=${filterValue.region}` : ""}&${
  //     filterValue.language ? `language=${filterValue.language}` : ""
  //   }&${
  //     filterValue.application ? `application=${filterValue.application}` : ""
  //   }`;
  //   console.log("query: ", newQueryString);
  //   navigate(newQueryString);
  // };
>>>>>>> Stashed changes

  const getOnDemandAllFilter = async () => {
    try {
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
    }
  };

  const getOndemandPageList = async () => {
    try {
<<<<<<< Updated upstream
=======
      console.log("getondemandpagelist");
>>>>>>> Stashed changes
      setVideoListLoading(true);
      const res = await axios.get(`/api/ondemand/page/list${search}`);
      setVideoList(res.data.result);
      // 페이지 넘어간후 필터 클릭했을때 아무것도 안뜨는거 방지
      if (res.data.totalCount <= itemPerPage) handlePageChange(1);
      setTotalCount(res.data.totalCount);
<<<<<<< Updated upstream
=======
      console.log(res.data.result);
      console.log("=======끝==========");
>>>>>>> Stashed changes
    } catch (error) {
      console.log(error);
    } finally {
      setVideoListLoading(false);
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  // const handleAddTag = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   t: Common.onDemandTagType,
  // ) => {
  //   // console.log("태그함수전", filterValue);
  //   let newFilterValue = [];
  //   if (t.type === "year") {
  //     newFilterValue = JSON.parse(JSON.stringify(filterValue.year));
  //   }
  //   if (t.type === "region") {
  //     newFilterValue = JSON.parse(JSON.stringify(filterValue.region));
  //   }
  //   if (t.type === "language") {
  //     newFilterValue = JSON.parse(JSON.stringify(filterValue.language));
  //   }
  //   if (t.type === "application") {
  //     newFilterValue = JSON.parse(JSON.stringify(filterValue.application));
  //   }
  //   if (newFilterValue.indexOf(`"${t.value}"`) === -1)
  //     newFilterValue.push(`"${t.value}"`);
  //   else newFilterValue.splice(newFilterValue.indexOf(`"${t.value}"`), 1);
  //   setFilterValue((prev) => {
  //     return { ...prev, [t.type]: newFilterValue };
  //   });

  //   query.set("page", String(page));
  //   query.set("itemPerPage", String(itemPerPage));
  //   query.set(`${t.type}`, newFilterValue.join(","));
  //   console.log("스트링 변환 ", newFilterValue.join(","));
  //   console.log("filtervalue is change!");
  // };

  // queryString에서 현재 필터값 추출
  const handleActive = () => {
    const newFilterList = [];
    // let tagRef;
    // console.log("handle active", query.toString());
    if (query.get("year")) {
      query
        .get("year")
        .split(",")
        // eslint-disable-next-line array-callback-return
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
    if (newFilterList) {
      newFilterList.map((m) => {
        return handleAddFilter(null, m);
        // let tagRef =  document.querySelector(`.tag.tag-${m.type}-${m.value.replace(/\s/g, "-")}`)
        // return document
        //   .querySelector(`.tag.tag-${m.type}-${m.value.replace(/\s/g, "-")}`)
        //   .classList.add("active");
        // // .classList.add("active");
        // // .classList.add("active");
      });
    }
    setFilterList(newFilterList);
  };

>>>>>>> Stashed changes
  // filterValue에 현재 눌린값 넣어준후 바로 쿼리에 set 후 navigate하는 메소드
  const handleAddTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: Common.onDemandTagType,
  ) => {
    let newFilterValue = [];
<<<<<<< Updated upstream
=======
    // console.log(query.get(`${t.type}`));
>>>>>>> Stashed changes
    newFilterValue = query.get(`${t.type}`)
      ? query.get(`${t.type}`).split(",")
      : [];
    if (newFilterValue.indexOf(`${t.value}`) === -1)
      newFilterValue.push(`${t.value}`);
    else newFilterValue.splice(newFilterValue.indexOf(`${t.value}`), 1);
    query.set(`${t.type}`, newFilterValue.join(","));
<<<<<<< Updated upstream
    // 필터 적용되면 page 1로 변경
    // setPage(1);
    // query.set("page", "1");
    query.set("page", String(page));
    query.set("itemPerPage", String(itemPerPage));

    navigate(`?${query.toString()}`);
=======
    query.set("page", String(page));
    query.set("itemPerPage", String(itemPerPage));
    // history.pushState(null, null, `?${query.toString()}`);
    // console.log(query.toString());
    // setQueryString(query.toString());
    // console.log(query.toString());
    navigate(`?${query.toString()}`);
    // eslint-disable-next-line no-restricted-syntax
    // if (t.type === "year") {
    //   newFilterValue = JSON.parse(JSON.stringify(filterValue.year));
    // }
    // if (t.type === "region") {
    //   newFilterValue = JSON.parse(JSON.stringify(filterValue.region));
    // }
    // if (t.type === "language") {
    //   newFilterValue = JSON.parse(JSON.stringify(filterValue.language));
    // }
    // if (t.type === "application") {
    //   newFilterValue = JSON.parse(JSON.stringify(filterValue.application));
    // }
    // if (newFilterValue.indexOf(`"${t.value}"`) === -1)
    //   newFilterValue.push(`"${t.value}"`);
    // else newFilterValue.splice(newFilterValue.indexOf(`"${t.value}"`), 1);
    // query.set(`${t.type}`, newFilterValue.join(","));
    // setFilterValue((prev) => {
    //   return { ...prev, [t.type]: newFilterValue };
    // });
    // console.log("filtervalue is change!");
>>>>>>> Stashed changes
  };

  const handleAddFilter = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: Common.onDemandTagType,
  ) => {
    const tagRef = document.querySelector(
      `.tag.tag-${t.type}-${t.value.replace(/\s/g, "-")}`,
    );
    if (tagRef !== null) {
<<<<<<< Updated upstream
      tagRef.classList.add("active");
    }
  };

  const handleClearFilter = () => {
    // filterList를 빈 리스트로 대체.
    setFilterList([]);
    navigate("");
=======
      console.log(`.tag.tag-${t.type}-${t.value.replace(/\s/g, "-")}`);
      // let newFilterList = JSON.parse(JSON.stringify(filterList));
      // if (filterList.map((f) => f.value).indexOf(t.value) === -1) {
      //   newFilterList.push(t);
      tagRef.classList.add("active");
      //   } else {
      //     newFilterList = newFilterList.filter((f) => f.value !== t.value);
      //     tagRef.classList.remove("active");
      //   }
      //   setFilterList(newFilterList);
    }
  };

  // 삭제 handler
  const handleDeleteEachFilter = (t: Common.onDemandTagType) => {
    // filterList 에서 선택된 것 제거
    // let tmpFilterList = JSON.parse(JSON.stringify(filterList));

    // tmpFilterList = tmpFilterList.filter((f) => f.value !== target.value);
    // setFilterList(tmpFilterList);

    // document
    //   .querySelector(
    //     `.tag.tag-${target.type}-${target.value.replace(/\s/g, "-")}`,
    //   )
    //   .classList.remove("active");
    let newFilterValue = [];
    // console.log(query.get(`${t.type}`));
    newFilterValue = query.get(`${t.type}`)
      ? query.get(`${t.type}`).split(",")
      : [];
    if (newFilterValue.indexOf(`"${t.value}"`) === -1)
      newFilterValue.push(`"${t.value}"`);
    else newFilterValue.splice(newFilterValue.indexOf(`"${t.value}"`), 1);
    query.set(`${t.type}`, newFilterValue.join(","));
    query.set("page", String(page));
    query.set("itemPerPage", String(itemPerPage));
    navigate(`?${query.toString()}`);
  };
  const handleClearFilter = () => {
    // filterList를 빈 리스트로 대체.
    navigate("");
    // setFilterList([]);
    // // 모든 tag들의 active 클래스 제거
    // document.querySelectorAll(`.tag`).forEach((e) => {
    //   e.classList.remove("active");
    // });
>>>>>>> Stashed changes
  };

  // admin
  // ondemand video 추가 버튼 handler
  const addVideoHandler = () => {
    setEdit(false);
    setOpenEditModal(true);
  };

  // 페이지 변경
  const handlePageChange = (page) => {
<<<<<<< Updated upstream
=======
    // setPage(page);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                      handleAddTag(null, f);
=======
                      handleDeleteEachFilter(f);
                      // handleAddTag(e,f);
>>>>>>> Stashed changes
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
            {videoList.map((v, idx) => (
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
            activePage={page}
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
