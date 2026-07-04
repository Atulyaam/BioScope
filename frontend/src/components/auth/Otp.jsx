import { useState, useEffect } from "react";
import { FaShieldAlt, FaArrowRight } from "react-icons/fa";
import axiosInstance from "../../apis/index";

const Otp = ({ email, hash, onSuccess, onBack }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp: parseInt(otp),
        hash,
      });

      if (response.data.auth && response.data.user) {
        if (onSuccess) {
          onSuccess(response.data.user);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError("");
    try {
      const response = await axiosInstance.post("/auth/send-otp", { email });
      setOtp("");
      setTimeLeft(120);
      setCanResend(false);
      // Toast or success message could go here
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f84464] to-[#e63a54] rounded-full mb-4 shadow-md">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              We've sent a 4-digit code to
              <br />
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setOtp(value);
                  setError("");
                }}
                placeholder="0000"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 text-center text-2xl font-bold tracking-widest placeholder-gray-400 ${
                  error
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:bg-white"
                    : "border-gray-200 bg-gray-50 focus:border-[#f84464] focus:bg-white focus:shadow-md"
                }`}
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            {/* Timer */}
            <div className={`text-center py-3 rounded-lg ${timeLeft > 60 ? "bg-blue-50" : "bg-red-50"}`}>
              <p className="text-sm text-gray-600 mb-1">Time remaining</p>
              <p
                className={`text-2xl font-bold ${
                  timeLeft > 60 ? "text-blue-600" : "text-red-600"
                }`}
              >
                {formatTime(timeLeft)}
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.length !== 4}
              className="w-full bg-gradient-to-r from-[#f84464] to-[#e63a54] hover:shadow-lg hover:from-[#f54d6f] hover:to-[#f03a54] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            {canResend ? (
              <>
                <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-[#f84464] hover:text-[#e63a54] font-semibold text-sm transition-colors disabled:opacity-70"
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-xs">
                You can resend OTP after the timer expires
              </p>
            )}
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full mt-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Back to Email
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-600 text-xs md:text-sm mt-6 px-4">
          💡 Check your spam folder if you didn't receive the code
        </p>
      </div>
    </div>
  );
};

export default Otp;
