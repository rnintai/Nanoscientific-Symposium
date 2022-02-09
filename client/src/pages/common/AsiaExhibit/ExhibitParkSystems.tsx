import React from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const ExhibitParkSystems = () => {
  const HTML = useHTML("/api/page/common/exhibit/parksystems");
  return <InnerHTML html={HTML} />;
};

export default ExhibitParkSystems;
