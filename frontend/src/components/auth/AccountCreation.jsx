import { useState } from "react";
import { FaUser, FaPhone, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/index";

const AccountCreation = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/user/activate/${user._id}`, {
        name: formData.name,
        phone: formData.phone ? parseInt(formData.phone) : null,
      });

      setSuccess(true);
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-md">
              <span className="text-white text-3xl">✓</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Account Created!
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Your account has been activated successfully. Welcome to BioScope!
            </p>
            <div className="animate-pulse">
              <p className="text-gray-500 text-sm">Redirecting...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f84464] to-[#e63a54] rounded-full mb-4 shadow-md">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Help us know you better
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-700">
                {formData.email}
              </div>
              <span className="inline-block text-green-600 text-xs bg-green-100 px-2 py-1 rounded mt-2">
                ✓ Verified
              </span>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-gray-400">
                  <FaUser className="text-lg" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#f84464] focus:bg-white focus:shadow-md"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-gray-400">
                  <FaPhone className="text-lg" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#f84464] focus:bg-white focus:shadow-md"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <span>⚠</span> {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#f84464] to-[#e63a54] hover:shadow-lg hover:from-[#f54d6f] hover:to-[#f03a54] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Setup
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs md:text-sm">
              ℹ️ You can update your profile information anytime from your account settings.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-xs md:text-sm mt-6 px-4">
          By completing your profile, you agree to our{" "}
          <a href="#" className="text-[#f84464] hover:underline font-semibold">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default AccountCreation;
