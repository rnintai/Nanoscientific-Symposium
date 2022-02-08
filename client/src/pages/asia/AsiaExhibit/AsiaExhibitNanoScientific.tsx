import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "../../../hooks/useHTML";

const AsiaExhibitNanoScientific = () => {
  const HTML = useHTML("/api/page/asia/exhibit/nanoscientific");
  return <InnerHTML html={HTML} />;
};

export default AsiaExhibitNanoScientific;
