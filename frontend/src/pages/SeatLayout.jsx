import Header from "../components/seatLayout/Header";
import Footer from "../components/seatLayout/Footer";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowById } from "../apis/index";
import screenImg from "../assets/screen.png"; 
import { useSeatContext } from "../context/SeatContext";
import { useLocation } from "../context/LocationContext";
import { socket } from "../utils/socket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Seat = ({ seat, row, type, selectedSeats, lockedSeats , onClick }) => {
  const seatId = `${type}-${row}${seat.number}`; // Include type to make unique
  const isLocked = lockedSeats?.includes(seatId);
  const isSelected = selectedSeats.includes(seatId);

  return (
    <button
      className={`w-9 h-9 m-[2px] rounded-lg border text-sm
        ${
          seat.status === "occupied"
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : isLocked
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-[#6e52fa] text-white border-[#cec4f7] border-3 cursor-pointer"
            : "hover:bg-gray-100 border-black cursor-pointer"
        }`}
      disabled={seat.status === "occupied" || isLocked}
      onClick={onClick}
    >
      {seat.status === "occupied" || isLocked ? "X" : seat.number}
    </button>
  );
};

const SeatLayout = () => {
  const [lockedSeats, setLockedSeats] = useState();
  const { selectedSeats, setSelectedSeats } = useSeatContext();
  const { location } = useLocation();

  const handleSelectSeat = (type, row, number) => {
    const seatId = `${type}-${row}${number}`; // Include type to make unique

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((existingId) => existingId !== seatId)
        : [...prev, seatId]
    );
  };

  const { showId } = useParams();

  const { data: showData } = useQuery({
    queryKey: ["show", showId],
    queryFn: async () => await getShowById(showId),
    placeholderData: keepPreviousData,
    enabled: !!showId,
    select: (res) => res.data,
  });

  // Calculate total price based on selected seats
  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    if (!showData?.seatLayout) return sum;
    
    // Extract type and row from seatId (e.g., "Executive-A1" -> type="Executive", row="A")
    const [type, rowAndNumber] = seatId.split('-');
    const row = rowAndNumber?.charAt(0);
    
    const rowData = showData.seatLayout.find((r) => r.row === row && r.type === type);
    return sum + (rowData?.price || 0);
  }, 0);

  const isSelectedSeats = selectedSeats.length > 0;


  /* Socket.io Code start  */

  useEffect(() => {
    setSelectedSeats([]);
    socket.emit("join-show", { showId });
    socket.on("locked-seats-initials", ({ seatIds }) => {
      setLockedSeats(seatIds);
    });

    socket.on("seat-locked", ({ seatIds, showId: incomingShowId }) => {
      if (incomingShowId !== showId) return;

      setLockedSeats((prev) => [...new Set([...prev, ...seatIds])]);
    });

    socket.on("seat-unlocked", ({ seatIds, showId: incomingShowId }) => {
      if (incomingShowId !== showId) return;

      setLockedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
    });

    socket.on("seat-locked-failed", ({ requested: seatIds, alreadyLocked }) => {
      toast.error(
        `Some seats are already locked: ${alreadyLocked.join(", ")}`
      );
    });

    return () => {
      socket.off("locked-seats-initials");
      socket.off("seat-locked");
      socket.off("seat-unlocked");
      socket.off("seat-locked-failed");
    };
  }, [showId, setSelectedSeats]);


  console.log("lockedseats: ", lockedSeats);


  /* Socket.io Code ends */


  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <Header showData={showData} />
        </div>

        {/* Scrollable Seat Layout - takes remaining space */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col items-center justify-center">
              {showData?.seatLayout && (
                <div className="flex flex-col items-center justify-center">
                  {Object.entries(
                    showData.seatLayout.reduce((acc, curr) => {
                      if (!acc[curr.type])
                        acc[curr.type] = { price: curr.price, rows: [] };
                      acc[curr.type].rows.push(curr);
                      return acc;
                    }, {})
                  ).map(([type, { price, rows }]) => (
                    <div
                      key={type}
                      className="mb-12 w-full flex flex-col items-center justify-center"
                    >
                      <h2 className="text-center font-semibold text-lg mb-4">
                        {type} : ₹{price}
                      </h2>
                      <div className="space-y-2">
                        {rows.map((rowObj) => (
                          <div key={rowObj.row} className="flex items-center">
                            <div className="w-6 text-right mr-2 text-sm text-gray-600">
                              {rowObj.row}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {rowObj.seats.map((seat, i) => (
                                <Seat
                                  key={i}
                                  seat={seat}
                                  row={rowObj.row}
                                  type={type}
                                  selectedSeats={selectedSeats}
                                  lockedSeats={lockedSeats}
                                  onClick={() =>
                                    handleSelectSeat(type, rowObj.row, seat.number)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-5 mb-8">
                <img
                  src={screenImg}
                  alt="Screen"
                  className="w-[300px] md:w-[400px] object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 border-t border-gray-200">
          <Footer
            isSelected={isSelectedSeats}
            selectedSeats={selectedSeats}
            showData={showData}
            state={location}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </>
  );
};

export default SeatLayout;
