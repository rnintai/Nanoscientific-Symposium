import React from 'react';

import InnerHTML from "dangerously-set-html-content";
import useHTML from "../../hooks/useHTML";

function AsiaExhibit() {

  const HTML = useHTML('/api/page/asia/exhibit_hall')
  return (
    <InnerHTML html={HTML} />
  );
}

export default AsiaExhibit;