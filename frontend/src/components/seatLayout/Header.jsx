import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/main-icon.png";

export default function Header({ showData,type }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        fontFamily:
          "'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={mainLogo}
          alt="BioScoops"
          style={{ height: 28, objectFit: "contain", cursor: "pointer" }}
        />

        {type=== "checkout" ? (
          <div>
            <h2 className="font-bold text-gray-900 text-lg md:text-xl">Review Your Booking</h2>
          </div>
        ) : (
          /* Movie + meta */
          <div style={{ textAlign: "center", flex: 1, padding: "0 16px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.3,
              }}
            >
              {showData?.movie?.title ?? ""}
            </h2>
            {showData && (
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 11,
                  color: "#888",
                  lineHeight: 1.4,
                }}
              >
                {showData.date} &bull; {showData.startTime} &bull;{" "}
                {showData.theater?.name}
                {showData.theater?.location
                  ? `, ${showData.theater.location}`
                  : ""}
              </p>
            )}
          </div>
        )}

        

        {/* Sign in */}
        <button
          style={{
            background: "#f84464",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "7px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            flexShrink: 0,
            fontFamily: "inherit",
          }}
        >
          Sign in
        </button>
      </div>

      {/* ── Show-time pills (if multiple shows available in future) ── */}
      {type !== "checkout" && showData && (
        <div
          style={{
            padding: "0 20px 10px",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#f84464",
              color: "#fff",
              borderRadius: 8,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.4,
              minWidth: 80,
              textAlign: "center",
            }}
          >
            <span>{showData.startTime}</span>
            <span
              style={{ fontSize: 9, fontWeight: 500, opacity: 0.85, marginTop: 1 }}
            >
              {showData.formate} {showData.audioType}
            </span>
          </div>
        </div>
      )}
     
    </div>
  );
}