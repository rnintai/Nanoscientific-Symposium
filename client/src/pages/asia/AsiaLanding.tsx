import React from 'react';
import useHTML from "../../hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

function AsiaLanding() {
  const HTML = useHTML('/api/page/asia/landing')

  return (
    <InnerHTML html={HTML} />
  );
}

export default AsiaLanding;