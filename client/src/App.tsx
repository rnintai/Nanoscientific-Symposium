import React from 'react';
import './App.css';
import AsiaExhibit from "./pages/asia/AsiaExhibit";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/asia/exhibit" element={<AsiaExhibit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
