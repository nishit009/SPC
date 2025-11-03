import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="w-full h-[150px] bg-[#FDF8F6] flex flex-col items-center justify-center space-y-2">
      <div>Contact no - 9849025535</div>

      <Link
        to="https://www.instagram.com/sreepavancaterers?igsh=MWp3c3B6OGZ0OTY0OQ=="
        target="_blank"
        rel="noopener noreferrer"
        className="text-600 hover:underline"
      >
        Instagram
      </Link>
    </div>
  );
}

export default Footer;
