import { useEffect, useState } from "react";
import { LocationContext } from "./LocationContext";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(() => {
    // Initialize loading state based on geolocation availability
    return "geolocation" in navigator;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!("geolocation" in navigator)) {
      return;
    }

    const fetchLocationData = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        );
        const data = await res.json();
        const userLocation =
          data?.address?.state || data?.address?.city || data?.display_name;
        setLocation(userLocation || null);
      } catch {
        if (isMounted) {
          setError("Failed to fetch location data");
        }
      } finally {
        setLoading(false);
      }
    };

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      fetchLocationData(latitude, longitude);
    };

    const fail = () => {
      if (isMounted) {
        setError("Unable to retrieve your location via browser geolocation");
        // Try IP-based fallback to improve UX when users deny permission
        (async () => {
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            const ipLocation = data.region || data.city || data.country_name;
            setLocation(ipLocation || null);
            setError(null);
          } catch (ipErr) {
            setLocation(null);
            setError("Unable to detect location");
          } finally {
            setLoading(false);
          }
        })();
      }
    };

    navigator.geolocation.getCurrentPosition(success, fail);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading, error, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
