import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkBaseStyles = 'text-[#5c4b44] px-4 h-full py-7 text-sm md:text-base';
  const activeStyles = 'bg-white';

  return (
    <nav className="w-full h-20 bg-[#FDF8F6] flex items-center justify-between px-6">
      {/* Left links */}
      <div className="flex space-x-6">
        <NavLink
          to="/home"
          className={({ isActive }) => `${linkBaseStyles} ${isActive ? activeStyles : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${linkBaseStyles} ${isActive ? activeStyles : ''}`}
        >
          About Us
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => `${linkBaseStyles} ${isActive ? activeStyles : ''}`}
        >
          Events
        </NavLink>
      </div>

      {/* Right section: chatbot + create booking */}
      <div className="flex items-center space-x-4">
        {/* Chatbot button (image) */}
        <button
          onClick={() => alert('Chatbot coming soon 🤖')}
          className="flex items-center justify-center rounded-full hover:scale-105 transition-transform"
        >
          <img
            src="../../images/chatbot_8943377.png" // 👈 replace this with your chatbot image path
            alt="Chatbot"
            className="w-8 h-8 object-contain"
          />
        </button>

        {/* Create Booking */}
        <NavLink
          to="/booking"
          className={({ isActive }) => `${linkBaseStyles} ${isActive ? activeStyles : ''}`}
        >
          Create Booking
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
