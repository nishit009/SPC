import React from "react";
import { Link } from "react-router-dom";

function Details() {
  return (
    <>
      <h1>motham details</h1>
      <div className="w-full h-screen flex justify-between items-center align-middle p-[20px]">
        <Link to="/booking/menu" className="text-[#7B2E2E]">
          previous
        </Link>
        <Link to="/booking/menu/details" className="text-[#7B2E2E]">
          confirm
        </Link>
      </div>
    </>
  );
}

export default Details;
