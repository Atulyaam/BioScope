import { useState } from "react";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import axiosInstance from "../../apis/index";

const Email = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/send-otp", { email });
      
      // Pass data to parent component
      if (onSuccess) {
        onSuccess({
          email: response.data.email,
          hash: response.data.hash,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
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
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Sign in to your account or create a new one
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOtp} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-gray-400">
                  <FaEnvelope className="text-lg" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                    error
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:bg-white"
                      : "border-gray-200 bg-gray-50 focus:border-[#f84464] focus:bg-white focus:shadow-md"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#f84464] to-[#e63a54] hover:shadow-lg hover:from-[#f54d6f] hover:to-[#f03a54] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send OTP
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium">
              <span className="text-xl">𝒈</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium">
              <span className="text-xl">𝒇</span> Facebook
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-600 text-xs md:text-sm mt-6">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-[#f84464] hover:underline font-semibold"
            >
              Terms of Service
            </a>
            {" "}and{" "}
            <a
              href="#"
              className="text-[#f84464] hover:underline font-semibold"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 px-4 space-y-3">
          <p className="text-gray-600 text-xs md:text-sm">
            💡 Didn't receive an OTP? Check your spam folder or request a new one
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            By entering your email address, you are agreeing to our{" "}
            <a href="#" className="text-[#f84464] hover:underline font-semibold">
              Terms of Service
            </a>
            {" "}and{" "}
            <a href="#" className="text-[#f84464] hover:underline font-semibold">
              Privacy Policies
            </a>
            . Thank you for your trust!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Email;
