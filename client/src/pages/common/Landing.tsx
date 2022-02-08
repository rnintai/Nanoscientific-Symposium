import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const Landing = () => {
  const HTML = useHTML("/api/page/common/landing");

  return <InnerHTML html={HTML} />;
};

export default Landing;
