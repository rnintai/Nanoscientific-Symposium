import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "../../hooks/useHTML";

const KoreaLanding = () => {
  const HTML = useHTML("/api/page/korea/landing");

  return <InnerHTML html={HTML} />;
};

export default KoreaLanding;
