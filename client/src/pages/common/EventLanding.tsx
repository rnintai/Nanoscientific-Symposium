import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";

const EventLanding = () => {
  const [HTML, loading] = useHTML("/api/page/common/landing");
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default EventLanding;
