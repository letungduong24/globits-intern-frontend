import { createContext, useContext } from "react";
import CountryStore from "./views/Country/CountryStore";
import EthnicsStore from "./views/Ethnics/EthnicsStore";
import ReligionStore from "./views/Religion/ReligionStore";
import FamilyRelationshipStore from "./views/FamilyRelationship/FamilyRelationshipStore";
import DepartmentStore from "./views/Department/DepartmentStore";

export const store = {
  countryStore: new CountryStore(),
  ethnicsStore: new EthnicsStore(),
  religionStore: new ReligionStore(),
  familyRelationshipStore: new FamilyRelationshipStore(),
  departmentStore: new DepartmentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
