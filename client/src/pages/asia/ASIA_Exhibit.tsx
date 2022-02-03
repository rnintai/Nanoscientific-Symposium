import React, {useEffect, useState} from 'react';
import axios from "axios";

import InnerHTML from "dangerously-set-html-content";

function Asia_Exhibit() {
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

export default Asia_Exhibit;