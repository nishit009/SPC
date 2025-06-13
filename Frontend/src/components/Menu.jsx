import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <h1>items are here</h1>
      <div className="w-full h-screen flex justify-between items-center align-middle p-[20px]">
        <Link to="/booking" className="text-[#7B2E2E]">
          previous
        </Link>
        <Link to="/booking/menu/details" className="text-[#7B2E2E]">
          next
        </Link>
      </div>
    </>
  );
}

export default Menu;
