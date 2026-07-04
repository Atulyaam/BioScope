import { FaSearch } from "react-icons/fa";
import FullLogo from "../../assets/FullLogo.png";
import { useState } from "react";
import {
  useLocation as useRouterLocation,
  useNavigate,
} from "react-router-dom";
import { useLocation } from "../../hooks/useLocation";

import pinIcon from "../../assets/pin.gif";

// Map nav item labels to their routes
const navRoutes = {
  Movie: "/movies",
  Stream: "/stream",
  Events: "/events",
  Plays: "/plays",
  Sports: "/sports",
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const routerLocation = useRouterLocation();
  const navigate = useNavigate();
  const { location, loading } = useLocation();

  // Derive active nav from current URL — no default hardcoding
  const getActiveNav = () => {
    for (const [label, route] of Object.entries(navRoutes)) {
      if (routerLocation.pathname.startsWith(route)) return label;
    }
    return null; // On home page or unknown routes, nothing is active
  };
  const activeNav = getActiveNav();

  const navItems = ["Movie", "Stream", "Events", "Plays", "Sports"];
  const bottomNavItems = [
    "List Your Show",
    "Corporates",
    "Offers",
    "Gift Cards",
  ];

  return (
    <div className="w-full bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 shadow-sm">
        <div className="px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            {/* Logo Section */}
            <div
              className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => navigate("/")}
            >
              <img
                src={FullLogo}
                alt="BioScope Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="text-3xl font-bold text-[#f84464] hidden sm:inline">
                BioScope
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md lg:max-w-2xl">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search movies, shows, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 pr-10 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#f84464] focus:bg-white focus:shadow-md hover:border-gray-300"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#f84464] transition-colors" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Location */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <img
                  src={pinIcon}
                  alt="location pin"
                  className="h-5 w-5 object-contain"
                />
                <span className="text-sm font-medium text-gray-700">
                  {loading ? "Locating..." : location || "Set Location"}
                </span>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => navigate("/auth")}
                className="bg-[#f84464] hover:bg-[#e63a54] text-white px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Main Categories */}
            <div className="flex items-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (navRoutes[item]) navigate(navRoutes[item]);
                  }}
                  className={`px-4 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 ${
                    activeNav === item
                      ? "text-[#f84464] border-[#f84464]"
                      : "text-gray-700 border-transparent hover:text-[#f84464]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Secondary Links */}
            <div className="flex items-center gap-1">
              {bottomNavItems.map((item) => (
                <span
                  key={item}
                  className="px-3 py-3.5 text-xs sm:text-sm text-gray-600 cursor-pointer hover:text-[#f84464] hover:underline transition-colors duration-200 font-medium whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
