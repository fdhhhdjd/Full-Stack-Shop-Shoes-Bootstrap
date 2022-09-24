import React, { createContext, useContext } from "react";
import CONFIGS from "../../configs/config";
export const API_USER = `${CONFIGS.REACT_APP_API_URL}/api/user`;
export const StoreContextUser = createContext();
export const useContextUser = () => useContext(StoreContextUser);
export const DataProviderUser = ({ children }) => {
  const data = {};
  StoreContextUser.displayName = "Global State User";
  return (
    <StoreContextUser.Provider value={data}>
      {children}
    </StoreContextUser.Provider>
  );
};
