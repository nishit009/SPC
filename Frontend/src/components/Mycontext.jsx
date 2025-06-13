import React, { createContext, useContext } from "react";

export const Mycontext = createContext();
function MyProvider({ children }) {
  const options = [
    "Reception",
    "Birthday",
    "Anniversary",
    "Vratham",
    "Mehendi",
    "Engagement",
    "Haldi",
    "House Warming",
    "Wedding",
  ];
  return (
    <>
      <Mycontext.Provider value={{ options }}>{children}</Mycontext.Provider>
    </>
  );
}

export default MyProvider;
