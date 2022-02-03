import React from 'react';
import AsiaExhibit from "./pages/asia/AsiaExhibit";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import AsiaLanding from "./pages/asia/AsiaLanding";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>

        <Route path="/asia/" element={<AsiaLanding/>}/>
        <Route path="/asia/exhibit" element={<AsiaExhibit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
