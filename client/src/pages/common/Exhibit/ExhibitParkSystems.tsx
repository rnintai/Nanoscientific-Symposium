import React from "react";

import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";

const ExhibitParkSystems = () => {
  const [HTML, loading] = useHTML("/api/page/common/exhibit/parksystems");
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default ExhibitParkSystems;
