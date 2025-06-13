import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booking from "./components/Booking";
import Menu from "./components/Menu";
import Details from "./components/Details";
import Layout from "./components/Layout";
import Events from "./components/Events";
import About from "./components/About";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Events" element={<Events />}></Route>
            <Route path="/booking/menu" element={<Menu />}></Route>
            <Route path="/booking/menu/details" element={<Details />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
