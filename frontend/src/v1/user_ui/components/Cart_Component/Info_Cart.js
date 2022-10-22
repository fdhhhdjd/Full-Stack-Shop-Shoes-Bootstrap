import React from "react";
import { useSelector } from "react-redux";
import Cart_Empty from "./Cart_Empty";
import Cart_User from "./Cart_User";
const Info_Cart = () => {
  const { cart } = useSelector((state) => ({
    ...state.Cart_user,
  }));
  return (
    <React.Fragment>{!cart ? <Cart_Empty /> : <Cart_User />}</React.Fragment>
  );
};

export default Info_Cart;
