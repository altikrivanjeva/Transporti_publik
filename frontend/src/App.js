import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";  // Ensure correct folder name
import Home from "./componentes/Home";


function App() {
  return (
    <BrowserRouter>
      <Header />  {/* This makes the header always visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* You can add more routes here, each with different components */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
