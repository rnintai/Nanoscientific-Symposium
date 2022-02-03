import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import InnerHTML from 'dangerously-set-html-content'

function App() {

  const [myHTML, setMyHTML] = useState("")
  useEffect(() => {

    const getHTML = async () => {
      const HTML = await axios.get('/api/page/asia/exhibit_hall')
      setMyHTML(HTML.data);
    }
    getHTML()
  }, [])


  return (
    <InnerHTML html={myHTML} />

  );
}

export default App;
