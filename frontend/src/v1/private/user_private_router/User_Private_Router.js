import React from "react";
import { Outlet } from "react-router-dom";
import LoadingToRedirects_Layout_Main from "./LoadingToRedirects_Layout_Main";
import STORAGES from "../../utils/storage";
function User_Private_Router({ element: Element, ...rest }) {
  const token = STORAGES.getLocalStorage("accessToken");
  return <>{!token ? <Outlet /> : <LoadingToRedirects_Layout_Main />}</>;
}

export default User_Private_Router;
