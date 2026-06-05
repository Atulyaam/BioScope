import { createContext, useContext, useState } from "react";

const SeatContext = createContext(null);

export const SeatProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatContext.Provider>
  );
};

export const useSeatContext = () => {
  const context = useContext(SeatContext);
  if (!context) {
    throw new Error("useSeatContext must be used within a SeatProvider");
  }
  return context;
};

export default SeatContext;
