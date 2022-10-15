import React from "react";
import { Outlet } from "react-router-dom";
import LoadingToRedirect_Login from "./LoadingToRedirect_Login";
import { useSelector } from "react-redux";
function PrivateRouter({ element: Element, ...rest }) {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const token = accessToken;

  return <>{token ? <Outlet /> : <LoadingToRedirect_Login />}</>;
}
export default PrivateRouter;
