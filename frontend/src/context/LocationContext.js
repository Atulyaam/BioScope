import { createContext } from "react";

export const LocationContext = createContext({
  location: null,
  loading: true,
  error: null,
  setLocation: () => {},
});
