import React, { createContext, useContext, useState } from 'react';
import MenuItems from "../../../datasets/trail.json"

export const Mycontext = createContext();
function MyProvider({ children }) {
  const options = [
    'Reception',
    'Birthday',
    'Anniversary',
    'Vratham',
    'Mehendi',
    'Engagement',
    'Haldi',
    'House Warming',
    'Wedding',
  ];
  const [BookingDetails, setBookingDetails] = useState({
    date: '',
    firstname: '',
    lastname: '',
    selectedEvent: '',
    menu: [],
    address:'',
  });

  return (
    <>
      <Mycontext.Provider value={{ options, BookingDetails, setBookingDetails,MenuItems}}>
        {children}
      </Mycontext.Provider>
    </>
  );
}

export default MyProvider;
