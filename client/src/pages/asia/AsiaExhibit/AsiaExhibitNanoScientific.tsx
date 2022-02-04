import React from 'react';
import styled from "styled-components";
import useHTML from "../../../hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";


const AsiaExhibitNanoScientific = () => {
  const HTML = useHTML('/api/page/asia/exhibit/nanoscientific')
  return (
    <InnerHTML html={HTML} />
  );
}

export default AsiaExhibitNanoScientific;