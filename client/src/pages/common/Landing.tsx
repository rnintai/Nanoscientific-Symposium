import React from 'react';
import useHTML from "../../hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";

function Landing() {
  const HTML = useHTML('/api/page/common/landing')

  return (
    <InnerHTML html={HTML} />
  );
}

export default Landing;
