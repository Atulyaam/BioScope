import { useAuth } from "../../context/authContext";

export default function Footer({ showData, selectedSeats = [], totalPrice = 0 }) {
  const { auth, toggleModel } = useAuth();

  const handlePayNow = () => {
    if (!auth) {
      toggleModel();
      return;
    }
    if (selectedSeats.length === 0) return;
    console.log("[Footer] Proceeding to payment with seats:", selectedSeats, "total:", totalPrice);
  };

  const btnLabel = !auth
    ? "Sign in to Pay"
    : selectedSeats.length === 0
    ? "Select Seats"
    : `Pay ₹${totalPrice}`;

  return (
    <div
      style={{
        background: "#fff",
        borderTop: "1px solid #ececec",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily:
          "'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif",
        minHeight: 64,
      }}
    >
      {/* Left — theater + date info */}
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          {showData?.theater?.name ?? ""}
          {showData?.theater?.location ? ` — ${showData.theater.location}` : ""}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#aaa" }}>
          {showData?.date} &bull; {showData?.startTime}
        </p>
        {selectedSeats.length > 0 && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 12,
              fontWeight: 700,
              color: "#f84464",
            }}
          >
            {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}{" "}
            &middot; ₹{totalPrice}
          </p>
        )}
      </div>

      {/* Right — pay button */}
      <button
        onClick={handlePayNow}
        disabled={selectedSeats.length === 0 && !!auth}
        style={{
          background:
            selectedSeats.length === 0 && auth ? "#fca5b8" : "#f84464",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: 14,
          fontWeight: 700,
          cursor:
            selectedSeats.length === 0 && auth ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "background 0.15s",
          minWidth: 130,
        }}
      >
        {btnLabel}
      </button>
    </div>
  );
}
