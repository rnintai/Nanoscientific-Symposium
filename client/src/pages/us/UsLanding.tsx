import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const UsLanding = () => {
  const HTML = useHTML("/api/page/us/landing");

  return <InnerHTML html={HTML} />;
};

export default UsLanding;
