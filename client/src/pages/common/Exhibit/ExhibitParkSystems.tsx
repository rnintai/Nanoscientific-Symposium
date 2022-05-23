import React, { useEffect } from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import { globalData } from "utils/GlobalData";

const ExhibitParkSystems = () => {
  const pathname = usePageViews();
  const { exhibitHall } = globalData.get(pathname) as Common.globalDataType;
  // useEffect(() => {
  //   document.title = `${exhibitHall} | Nanoscientific 2022 ${pathname
  //     .replace("/", "")
  //     .toUpperCase()}`;
  // }, []);

  const [HTML, loading] = useHTML("/api/page/common/exhibit/parksystems");
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default ExhibitParkSystems;
