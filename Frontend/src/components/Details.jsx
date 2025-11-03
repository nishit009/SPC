import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from './Mycontext';
import { ChevronDown, ArrowRight, Copy, Download, Printer } from 'lucide-react';

function Details() {
  const { BookingDetails, setBookingDetails, MenuItems } = useContext(Mycontext);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showNextSection, setShowNextSection] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const mapInitialized = useRef(false);

  // Filter items
  const filteredItems = MenuItems.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add / Remove menu items
  const handleAddToMenu = (item) => {
    if (!BookingDetails.menu.some((menuItem) => menuItem.item_name === item.item_name)) {
      setBookingDetails((prev) => ({
        ...prev,
        menu: [...prev.menu, item],
      }));
    }
  };

  const handleRemoveFromMenu = (itemName) => {
    setBookingDetails((prev) => ({
      ...prev,
      menu: prev.menu.filter((menuItem) => menuItem.item_name !== itemName),
    }));
  };

  // Copy / Download / Print Handlers
  const handleCopy = () => {
    const menuText = BookingDetails.menu.map((i) => i.item_name).join('\n');
    navigator.clipboard.writeText(menuText);
    alert('Menu copied to clipboard!');
  };

  const handleDownload = () => {
    const menuText = BookingDetails.menu.map((i) => i.item_name).join('\n');
    const blob = new Blob([menuText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SelectedMenu.txt';
    link.click();
  };

  const handlePrint = () => {
    const menuText = BookingDetails.menu.map((i) => i.item_name).join('\n');
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write('<pre>' + menuText + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  // Confirm handler
  const handleConfirm = () => {
    alert('Booking confirmed! 🎉');
    navigate('/confirmation');
  };

  // Load Google Maps Script
  useEffect(() => {
    const existingScript = document.getElementById("googleMapsScript");
    if (existingScript) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    // Check if API key exists
    if (!apiKey) {
      console.error('Google Maps API key is missing! Please add VITE_GOOGLE_MAPS_API_KEY to your .env file');
      return;
    }

    const script = document.createElement("script");
    script.id = "googleMapsScript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("Google Maps script loaded successfully!");
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps script");
    };

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize Map when showNextSection becomes true
  useEffect(() => {
    if (!showNextSection || mapInitialized.current) return;

    const initMap = () => {
      const input = document.getElementById("autocomplete");
      const mapElement = document.getElementById("map");

      if (!input || !mapElement || !window.google) {
        console.log("Waiting for elements or Google Maps to load...");
        return;
      }

      console.log("Initializing map...");

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ['formatted_address', 'geometry', 'name'],
      });

      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 20.5937, lng: 78.9629 }, // Default: India
        zoom: 5,
      });

      const marker = new window.google.maps.Marker({
        map,
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.log("No geometry available for the selected place");
          return;
        }

        const location = place.geometry.location;
        map.setCenter(location);
        map.setZoom(14);
        marker.setPosition(location);

        setBookingDetails((prev) => ({
          ...prev,
          address: place.formatted_address,
          coordinates: {
            lat: location.lat(),
            lng: location.lng(),
          },
        }));
      });

      mapInitialized.current = true;
      console.log("Map initialized successfully!");
    };

    // Delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        console.log("Google Maps not loaded yet");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [showNextSection, setBookingDetails]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-white px-4 py-10">
      <div className="w-full max-w-6xl bg-[#FFF8F5] rounded-xl shadow-xl p-8 flex flex-col">
        <h1 className="text-2xl font-semibold text-[#5c4b44] mb-6 text-center">
          Select Your Menu
        </h1>

        {/* MENU SELECTION */}
        {!showNextSection && (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT */}
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

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleAddToMenu(item)}
                              className="p-1 text-[#5c4b44] hover:text-[#7B2E2E] transition-transform hover:scale-110"
                              title="Add to menu"
                            >
                              <ArrowRight size={18} />
                            </button>
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

              {/* RIGHT */}
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

                <div
                  ref={menuRef}
                  className="flex-1 max-h-[400px] overflow-y-auto rounded-md shadow-sm bg-white mx-2 mb-2"
                >
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

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Link to="/booking" className="text-sm text-[#5c4b44] font-medium hover:underline">
                Previous
              </Link>
              <button
                onClick={() => setShowNextSection(true)}
                className="text-sm text-[#5c4b44] font-medium hover:underline"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* FINAL REVIEW SECTION */}
        {showNextSection && (
          <>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* LEFT: Info */}
              <div className="flex-1 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-[#5c4b44] mb-4">Event Details</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[#5c4b44] mb-1">
                      Number of Members
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={BookingDetails.members || ''}
                      onChange={(e) =>
                        setBookingDetails((prev) => ({ ...prev, members: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#5c4b44] mb-1">
                      Price per Plate (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={BookingDetails.pricePerPlate || ''}
                      onChange={(e) =>
                        setBookingDetails((prev) => ({ ...prev, pricePerPlate: e.target.value }))
                      }
                    />
                  </div>

                  {/* Address with Google Autocomplete */}
                  <div>
                    <label className="block text-sm font-medium text-[#5c4b44] mb-1">
                      Address
                    </label>
                    <input
                      id="autocomplete"
                      type="text"
                      placeholder="Search location..."
                      value={BookingDetails.address}
                      onChange={(e) =>
                        setBookingDetails((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Start typing to see suggestions and view on map
                    </p>
                  </div>
                </div>

                {/* Map Display */}
                <div className="mt-4">
                  <div
                    id="map"
                    style={{
                      width: '100%',
                      height: '300px',
                      borderRadius: '10px',
                      marginTop: '10px',
                      border: '1px solid #ccc'
                    }}
                  ></div>
                </div>
              </div>

              {/* RIGHT: Selected Menu Card */}
              <div className="flex-1 bg-white shadow-md rounded-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-[#5c4b44]">Selected Menu</h2>
                  <div className="flex gap-1">
                    <button
                      onClick={handleCopy}
                      className="hover:bg-[#f5d0c5] text-[#5c4b44] p-2 rounded-full transition"
                      title="Copy menu"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="hover:bg-[#f5d0c5] text-[#5c4b44] p-2 rounded-full transition"
                      title="Download menu"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={handlePrint}
                      className="hover:bg-[#f5d0c5] text-[#5c4b44] p-2 rounded-full transition"
                      title="Print menu"
                    >
                      <Printer size={16} />
                    </button>
                  </div>
                </div>

                {/* Menu Items List */}
                <div className="flex-1 overflow-y-auto border border-gray-200 rounded-md max-h-[400px]">
                  {BookingDetails.menu.length > 0 ? (
                    <ul>
                      {BookingDetails.menu.map((item, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 border-b border-gray-100 last:border-b-0 text-[#5c4b44]"
                        >
                          {index + 1}. {item.item_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 italic">
                      No items selected
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PREVIOUS + CONFIRM BUTTONS */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setShowNextSection(false)}
                className="text-sm text-[#5c4b44] font-medium hover:underline"
              >
                Previous
              </button>
              <button
                onClick={handleConfirm}
                className="text-sm text-[#5c4b44] font-medium hover:underline"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Details;