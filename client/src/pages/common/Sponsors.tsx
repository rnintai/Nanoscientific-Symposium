import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";
import usePageViews from "hooks/usePageViews";

const Sponsors = () => {
  const pathname = usePageViews();

  const HTML = useHTML(`/api/page${pathname}/sponsors`);
  return <InnerHTML html={HTML} />;
};

export default Sponsors;
