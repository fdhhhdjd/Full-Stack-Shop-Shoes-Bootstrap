import React from "react";
import { Outlet } from "react-router-dom";
import LoadingToRedirect_Login from "./LoadingToRedirect_Login";
import STORAGES from "../../utils/storage";
function PrivateRouter({ element: Element, ...rest }) {
  const token = STORAGES.getLocalStorage("accessToken");
  return <>{token ? <Outlet /> : <LoadingToRedirect_Login />}</>;
}
export default PrivateRouter;
