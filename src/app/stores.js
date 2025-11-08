import { createContext, useContext } from "react";
import CountryStore from "./views/Country/CountryStore";

export const store = {
  countryStore: new CountryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
