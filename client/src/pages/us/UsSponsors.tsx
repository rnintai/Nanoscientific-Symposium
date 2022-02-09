import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

const UsSponsors = () => {
  const HTML = useHTML("/api/page/us/sponsors");
  return <InnerHTML html={HTML} />;
};

export default UsSponsors;
