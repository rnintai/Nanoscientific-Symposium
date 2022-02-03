import React, {useEffect, useState} from 'react';
import axios from "axios";

import InnerHTML from "dangerously-set-html-content";

function AsiaExhibit() {
  const [HTML, setHTML] = useState<string>("")
  useEffect(() => {

    const getHTML = async () => {
      const HTML = await axios.get('/api/page/asia/exhibit_hall')
      setHTML(HTML.data);
    }
    getHTML()
  }, [])
  return (
    <InnerHTML html={HTML} />
  );
}

export default AsiaExhibit;