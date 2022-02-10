import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

const JapanLanding = () => {
  const [HTML, loading] = useHTML("/api/page/jp/landing");

  return <InnerHTML html={HTML} />;
};

export default JapanLanding;
