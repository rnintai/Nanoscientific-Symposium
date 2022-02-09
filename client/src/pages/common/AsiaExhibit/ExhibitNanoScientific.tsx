import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const ExhibitNanoScientific = () => {
  const HTML = useHTML("/api/page/common/exhibit/nanoscientific");
  return <InnerHTML html={HTML} />;
};

export default ExhibitNanoScientific;
