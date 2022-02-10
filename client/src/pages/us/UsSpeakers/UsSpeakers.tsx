import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const UsSpeakers = () => {
  const [HTML, loading] = useHTML("/api/page/common/maintenance");

  return <InnerHTML html={HTML} />;
};

export default UsSpeakers;
