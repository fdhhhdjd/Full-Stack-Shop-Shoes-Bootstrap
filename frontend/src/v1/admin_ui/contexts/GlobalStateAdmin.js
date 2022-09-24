import React, { createContext, useContext } from "react";
import CONFIGS from "../../configs/config";
export const API_ADMIN = `${CONFIGS.REACT_APP_API_URL}/api/admin`;
export const StoreContextAdmin = createContext();
export const useContextAdmin = () => useContext(StoreContextAdmin);
export const DataProviderAdmin = ({ children }) => {
  const data = {};
  StoreContextAdmin.displayName = "Global State Admin";
  return (
    <StoreContextAdmin.Provider value={data}>
      {children}
    </StoreContextAdmin.Provider>
  );
};
