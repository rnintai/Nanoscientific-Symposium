import React from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const AsiaExhibitParkSystems = () => {
  const HTML = useHTML("/api/page/asia/exhibit/parksystems");
  return <InnerHTML html={HTML} />;
};

export default AsiaExhibitParkSystems;
