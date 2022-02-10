import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const KoreaLanding = () => {
  const [HTML, loading] = useHTML("/api/page/kr/landing");

  return <InnerHTML html={HTML} />;
};

export default KoreaLanding;
