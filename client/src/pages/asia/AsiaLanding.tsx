import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

function AsiaLanding() {
  const HTML = useHTML("/api/page/asia/landing");


  return (
    <InnerHTML html={HTML} />
  );
}

export default AsiaLanding;