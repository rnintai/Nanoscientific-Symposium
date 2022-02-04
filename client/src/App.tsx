import React from 'react';
import AsiaExhibit from "pages/asia/AsiaExhibit";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "pages/common/Landing";
import AsiaLanding from "pages/asia/AsiaLanding";
import NavBar from "components/NavBar/NavBar";
import usePageViews from "hooks/usePageViews";
import AsiaPrograms from "pages/asia/AsiaPrograms/AsiaPrograms";

function App() {

  const pathname = usePageViews();

  return (
    <>
      {pathname !== '/' && <NavBar/>}
      <Routes>
        {/*common*/}
        <Route path="/" element={<Landing/>}/>
        {/*asia */}
        <Route path="/asia/" element={<AsiaLanding/>}/>
        <Route path="/asia/exhibit" element={<AsiaExhibit/>}/>
        <Route path="/asia/programs" element={<AsiaPrograms/>}/>
      </Routes>
    </>
  );
}

export default App;
