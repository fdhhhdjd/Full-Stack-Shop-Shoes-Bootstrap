import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { useDispatch } from "react-redux";
import CONFIGS from "../../configs/config";
import CONTAINS from "../../configs/contants";
import STORAGES from "../../utils/storage";
import { New_Accept_Token_Initial } from "../../redux/authentication_slice/Api_Redux_Thunk";
import UserApi from "./Auth_Users_Context/Auth_Users";
export const API_USER = `${CONFIGS.REACT_APP_API_URL}/api/user`;
export const StoreContextUser = createContext();
export const useContextUser = () => useContext(StoreContextUser);

export const DataProviderUser = ({ children }) => {
  const dispatch = useDispatch();
  const user_login = STORAGES.getLocalStorage("Login_Users");
  useLayoutEffect(() => {
    if (user_login) {
      const refreshToken = async () => {
        dispatch(New_Accept_Token_Initial());
        setTimeout(() => {
          refreshToken();
          STORAGES.clearLocalStorage("accessToken");
        }, CONTAINS._15_MINUTES);
      };
      refreshToken();
    }
  }, []);
  const data = {
    User_Api_Context: UserApi(user_login),
  };
  StoreContextUser.displayName = "Global State User";
  return (
    <StoreContextUser.Provider value={data}>
      {children}
    </StoreContextUser.Provider>
  );
};
