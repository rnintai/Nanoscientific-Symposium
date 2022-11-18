import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import ThumbnailCard from "components/ThumbnailCard/ThumbnailCard";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OnDemandFilter from "components/OnDemandFilter/OnDemandFilter";
import { smallFontSize, xsmallFontSize } from "utils/FontSize";
import { OnDemandContainer } from "./OnDemandStyles";

const OnDemand = () => {
  const theme = useTheme();

  const [videoList, setVideoList] = useState<Common.onDemandVideoType[]>([]);
  const [filteredVideoList, setFilteredVideoList] = useState<
    Common.onDemandVideoType[]
  >([]);
  const [videoListLoading, setVideoListLoading] = useState<boolean>(false);

  const [filterList, setFilterList] = useState<string[]>([]);

  const [yearList, setYearList] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [filteredByYearList, setFilteredByYearList] = useState<
    Common.onDemandVideoType[]
  >([]);

  const [regionList, setRegionList] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [filteredByRegionList, setFilteredByRegionList] = useState<
    Common.onDemandVideoType[]
  >([]);

  useEffect(() => {
    getOnDemandList();
  }, []);

  useEffect(() => {
    filterByYear();
  }, [selectedYear]);

  useEffect(() => {
    filterByRegion();
  }, [selectedRegion]);

  useEffect(() => {
    filterByAll();
  }, [filteredByRegionList, filteredByYearList]);

  const getOnDemandList = async () => {
    try {
      setVideoListLoading(true);
      const res = await axios.get("/api/page/common/ondemand");
      setVideoList(res.data.result);
      setFilteredVideoList(res.data.result);
      setYearList([...new Set(res.data.result.map((v) => v.year))]);
      setRegionList([...new Set(res.data.result.map((v) => v.region))]);
    } catch (error) {
      console.log(error);
    } finally {
      setVideoListLoading(false);
    }
  };

  const filterByYear = () => {
    let newVideoList = JSON.parse(JSON.stringify(videoList));
    if (selectedYear.length !== 0) {
      newVideoList = newVideoList.filter((v: Common.onDemandVideoType) => {
        return selectedYear.some((y) => v.year.indexOf(y) !== -1);
      });
    }
    setFilteredByYearList(newVideoList);
  };

  const filterByRegion = () => {
    let newVideoList = JSON.parse(JSON.stringify(videoList));
    if (selectedRegion.length !== 0) {
      newVideoList = newVideoList.filter((v: Common.onDemandVideoType) => {
        return selectedRegion.some((y) => v.region.indexOf(y) !== -1);
      });
    }
    setFilteredByRegionList(newVideoList);
  };
  // Filter들의 교집합
  const filterByAll = () => {
    const idList = [
      filteredByRegionList.map((v) => v.id),
      filteredByYearList.map((v) => v.id),
    ];
    const intersectedIdList = idList.reduce((a, b) =>
      a.filter((c) => b.includes(c)),
    );

    // const result = videoList.filter((v,i,org) => idList.map(i => ))
    const result = [];

    for (let i = 0; i < intersectedIdList.length; i += 1) {
      result.push(...videoList.filter((v) => v.id === intersectedIdList[i]));
    }

    console.log(result);

    // const intersectedVideoList = data.reduce((a, b) =>
    //   a.filter((c) => b.includes(c)),
    // );

    // console.log(filteredByRegionList);
    // console.log(filteredByYearList);

    // console.log(
    //   [...new Set(data.map((e) => JSON.stringify(e)))]
    //     .map((e) => JSON.parse(e))
    //     .sort((a, b) => a.id - b.id),
    // );

    // const result = intersectedIdList.map(i => videoList.)
  };

  // filter
  const handleClickYear = (
    e: React.MouseEvent<HTMLButtonElement>,
    y: string,
  ) => {
    const newFilterList = JSON.parse(JSON.stringify(filterList));
    const newYearList = JSON.parse(JSON.stringify(selectedYear));
    if (selectedYear.indexOf(y) === -1) {
      e.currentTarget.classList.add("active");
      newYearList.push(y);
      setSelectedYear(newYearList);
      newFilterList.push(y);
      setFilterList(newFilterList);
    } else {
      e.currentTarget.classList.remove("active");
      setSelectedYear(newYearList.filter((ny) => ny !== y));
      setFilterList(newFilterList.filter((ny) => ny !== y));
    }
  };
  const handleClickRegion = (
    e: React.MouseEvent<HTMLButtonElement>,
    y: string,
  ) => {
    const newFilterList = JSON.parse(JSON.stringify(filterList));
    const newRegionList = JSON.parse(JSON.stringify(selectedRegion));
    if (selectedRegion.indexOf(y) === -1) {
      e.currentTarget.classList.add("active");
      newRegionList.push(y);
      setSelectedRegion(newRegionList);
      newFilterList.push(y);
      setFilterList(newFilterList);
    } else {
      e.currentTarget.classList.remove("active");
      setSelectedRegion(newRegionList.filter((ny) => ny !== y));
      setFilterList(newFilterList.filter((ny) => ny !== y));
    }
  };

  // 삭제 handler
  const handleDeleteEachFilter = () => {
    // filterList 에서 선택된 것 제거
  };
  const handleClearFilter = () => {
    // filterList를 빈 리스트로 대체.
  };

  return (
    <OnDemandContainer>
      <Stack flexDirection="row" justifyContent="center">
        {/* control panel */}
        <Stack className="control-panel" sx={{ p: "8px 12px" }}>
          <Box className="selected-filters">
            <Typography
              fontSize={xsmallFontSize}
              color={theme.palette.grey[600]}
              mb="5px"
            >
              Selected Filters
            </Typography>
            {/* <Stack direction="row" flexWrap="wrap" minHeight="20px">
            {filterList.map((f) => (
              <Typography>{f}</Typography>
              ))}
            </Stack> */}
            <Box mb={1}>
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
                    key={`selected-tag-${f}`}
                    className="tag selected"
                    sx={{ cursor: "default !important" }}
                    onClick={handleDeleteEachFilter}
                  >
                    {f} &times;
                  </Typography>
                ))
              )}
            </Box>
          </Box>
          <hr className="dashed" />
          <Typography
            fontSize={xsmallFontSize}
            color={theme.palette.grey[600]}
            sx={{ mt: 1 }}
          >
            Filters
          </Typography>
          <OnDemandFilter
            label="Year"
            filterList={yearList}
            selectedFilter={selectedYear}
            handleClick={handleClickYear}
          />
          <hr className="dashed" />
          <OnDemandFilter
            label="Region"
            filterList={regionList}
            selectedFilter={selectedRegion}
            handleClick={handleClickRegion}
          />
        </Stack>
        {/* videos */}
        <Stack className="video-result" flexDirection="row" flexWrap="wrap">
          {filteredByYearList.map((v, idx) => (
            <ThumbnailCard key={`card-${v.id}`} video={v} />
          ))}
          <hr className="dashed" />
          {filteredByRegionList.map((v, idx) => (
            <ThumbnailCard key={`card-${v.id}`} video={v} />
          ))}
        </Stack>
      </Stack>
    </OnDemandContainer>
  );
};

export default OnDemand;
