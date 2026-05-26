import { MdChair } from "react-icons/md";
import { ordersData } from "../../utils/constant";

const BookingHistory = () => {
  if (!ordersData.length) {
    return (
      <div className="px-6 rounded-md bg-white py-8 text-center text-gray-500">
        No booking history found.
      </div>
    );
  }

  return (
    <div className="px-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
      <div className="space-y-4">
        {ordersData.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-md overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <img
                src={order.poster}
                alt={order.title}
                className="w-24 md:w-32 h-36 md:h-40 object-cover rounded"
              />

              <div className="hidden md:block h-40 border-l border-dashed border-gray-300" />

              <div className="flex items-start justify-between w-full gap-4">
                <div className="flex-1">
                  <p className="font-normal text-lg">{order.title}</p>
                  <p className="text-sm text-gray-500">{order.format}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-2">
                    {order.datetime} - {order.cinema}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-2">
                    <MdChair className="inline mr-2 align-middle" size={20} />
                    {order.seats}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-500 whitespace-nowrap">
                  M-Ticket
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="text-sm text-gray-500">
                <p>Ticket: Rs. {order.ticket.toFixed(2)}</p>
                <p>Convenience Fees: Rs. {order.fee.toFixed(2)}</p>
              </div>
              <p className="text-xl font-bold">Rs. {order.total.toFixed(2)}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold">Booking Date & Time</p>
                <p>{order.bookingTime}</p>
              </div>
              <div>
                <p className="font-semibold">Payment Method</p>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <p className="font-semibold">Booking ID</p>
                <p>{order.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
