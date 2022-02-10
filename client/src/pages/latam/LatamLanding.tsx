import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const LatamLanding = () => {
  const [HTML, loading] = useHTML("/api/page/latam/landing");

  return <InnerHTML html={HTML} />;
};

export default LatamLanding;
