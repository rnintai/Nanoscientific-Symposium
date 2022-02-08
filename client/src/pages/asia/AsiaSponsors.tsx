import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

const AsiaSponsors = () => {
  const HTML = useHTML("/api/page/asia/sponsors");
  return <InnerHTML html={HTML} />;
};

export default AsiaSponsors;
