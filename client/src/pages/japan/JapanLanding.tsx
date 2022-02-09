import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

const JapanLanding = () => {
  const HTML = useHTML("/api/page/jp/landing");

  return <InnerHTML html={HTML} />;
};

export default JapanLanding;
