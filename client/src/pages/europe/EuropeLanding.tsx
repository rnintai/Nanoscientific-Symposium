import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const EuropeLanding = () => {
  const [HTML, loading] = useHTML("/api/page/europe/landing");

  return <InnerHTML html={HTML} />;
};

export default EuropeLanding;
