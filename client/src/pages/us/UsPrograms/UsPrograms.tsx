import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";

const UsPrograms = () => {
  const [HTML, loading] = useHTML("/api/page/common/maintenance");

  return <InnerHTML html={HTML} />;
};

export default UsPrograms;
