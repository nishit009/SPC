import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Mycontext } from './Mycontext';

function Booking() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const { options, BookingDetails, setBookingDetails } = useContext(Mycontext);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen px-4 py-8 flex justify-center items-center bg-white">
      <div className="w-full max-w-3xl md:h-auto flex flex-col items-center justify-center bg-[#FDF8F6] rounded-xl shadow-xl p-6 md:p-12">
        <form className="w-full flex flex-col items-center gap-y-6">
          <div className="w-full">
            {/* Date picker */}
            <label className="block mb-2 text-sm font-medium">Select a date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              placeholderText="Click to select a date"
              className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f5d0c5]"
            />
          </div>

          {/* First name input */}
          <div className="w-full">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              placeholder="First name"
              className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f5d0c5]"
            />
          </div>

          {/* Surname input */}
          <div className="w-full">
            <input
              type="text"
              name="surname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Surname"
              className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f5d0c5]"
            />
          </div>

          {/* Search Dropdown */}
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f5d0c5]"
            />
            {searchQuery && filteredOptions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => setSearchQuery(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-[#fdf4f0]"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <div className="w-full flex justify-between mt-6">
            <Link to="/" className="text-sm text-[#5c4b44] hover:underline">
              Previous
            </Link>
            <Link
              to="/booking/menu/details"
              className="text-sm text-[#5c4b44] hover:underline"
              onClick={() => {
                setBookingDetails((prev) => ({
                  ...prev,
                  date: startDate,
                  firstname: firstname,
                  lastname: lastname,
                  selectedEvent: searchQuery,
                }));
              }}
            >
              Next
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Booking;
