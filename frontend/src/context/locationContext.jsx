import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext({
  location: null,
  loading: true,
  error: null,
  setLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        );
        const data = await res.json();
        const userLocation =
          data?.address?.state || data?.address?.city || data?.display_name;
        setLocation(userLocation || null);
      } catch (err) {
        setError("Failed to fetch location data");
      } finally {
        setLoading(false);
      }
    };

    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      fetchLocationData(latitude, longitude);
    };

    const fail = () => {
      setError("Unable to retrieve your location");
      setLocation(null);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading, error, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useeLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
};
