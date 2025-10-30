import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mycontext } from './Mycontext';
import { ChevronDown, ArrowRight } from 'lucide-react';

function Details() {
  const { BookingDetails, setBookingDetails, MenuItems } = useContext(Mycontext);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter items from dataset
  const filteredItems = MenuItems.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add to menu
  const handleAddToMenu = (item) => {
    if (!BookingDetails.menu.some((menuItem) => menuItem.item_name === item.item_name)) {
      setBookingDetails((prev) => ({
        ...prev,
        menu: [...prev.menu, item],
      }));
    }
  };

  // Remove from menu
  const handleRemoveFromMenu = (itemName) => {
    setBookingDetails((prev) => ({
      ...prev,
      menu: prev.menu.filter((menuItem) => menuItem.item_name !== itemName),
    }));
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-white px-4 py-10">
      {/* Main Card */}
      <div className="w-full max-w-6xl bg-[#FFF8F5] rounded-xl shadow-xl p-8 flex flex-col">
        <h1 className="text-2xl font-semibold text-[#5c4b44] mb-6 text-center">Select Your Menu</h1>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT: Search + Items */}
          <div className="flex-1 flex flex-col">
            <label className="block mb-2 text-sm font-medium text-[#5c4b44]">
              Drag item or click ➡️ to add
            </label>

            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 px-4 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f5d0c5]"
            />

            <ul className="flex-1 overflow-y-auto border border-gray-200 rounded-md bg-white shadow-sm max-h-[400px]">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <li key={index} className="border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center px-4 py-2 hover:bg-[#fdf4f0] transition-colors">
                      {/* Draggable item */}
                      <span
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', JSON.stringify(item));
                        }}
                        className="cursor-grab active:cursor-grabbing font-medium text-[#5c4b44]"
                        onClick={() => handleAddToMenu(item)}
                      >
                        {item.item_name}
                      </span>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2">
                        {/* ➡️ Add Button */}
                        <button
                          onClick={() => handleAddToMenu(item)}
                          className="p-1 text-[#5c4b44] hover:text-[#7B2E2E] transition-transform hover:scale-110"
                          title="Add to menu"
                        >
                          <ArrowRight size={18} />
                        </button>

                        {/* ⬇️ Dropdown Button */}
                        <button
                          className="p-1 hover:text-[#7B2E2E] transition-transform hover:scale-110"
                          onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openIndex === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Dropdown Info */}
                    {openIndex === index && (
                      <div className="px-6 py-3 text-sm text-gray-700 bg-[#f9f5f3] border-t border-gray-200">
                        <p className="font-semibold text-[#5c4b44]">{item.item_name}</p>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 italic">No items found</li>
              )}
            </ul>
          </div>

          {/* RIGHT: Selected Menu */}
          <div
            className={`flex-1 flex flex-col rounded-md border-2 transition-all duration-200 ${
              isDragging ? 'border-[#f5d0c5] bg-[#fff8f5]' : 'border-gray-200 bg-[#FFF8F5]'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const data = e.dataTransfer.getData('text/plain');
              if (data) {
                const item = JSON.parse(data);
                handleAddToMenu(item);
              }
            }}
          >
            <label className="block mb-2 text-sm font-medium text-[#5c4b44] px-3 pt-3">
              Selected Menu
            </label>

            <div className="flex-1 max-h-[400px] overflow-y-auto rounded-md shadow-sm bg-white mx-2 mb-2">
              {BookingDetails.menu.length > 0 ? (
                <ul>
                  {BookingDetails.menu.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 flex justify-between items-center border-b border-gray-100 last:border-b-0"
                    >
                      <span>{item.item_name}</span>
                      <button
                        onClick={() => handleRemoveFromMenu(item.item_name)}
                        className="text-[#7B2E2E] hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 italic">
                  Drop or click items to add here 👇
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between mt-8">
          <Link to="/booking" className="text-sm text-[#5c4b44] font-medium hover:underline">
            Previous
          </Link>
          <Link
            to="/booking/menu/details"
            className="text-sm text-[#5c4b44] font-medium hover:underline"
          >
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
