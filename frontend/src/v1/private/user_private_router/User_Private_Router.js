import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingToRedirects_Layout_Main from "./LoadingToRedirects_Layout_Main";
function User_Private_Router({ element: Element, ...rest }) {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const token = accessToken;
  return <>{!token ? <Outlet /> : <LoadingToRedirects_Layout_Main />}</>;
}

export default User_Private_Router;
