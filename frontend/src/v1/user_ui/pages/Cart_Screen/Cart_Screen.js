import React from "react";
import { useSelector } from "react-redux";
import { Info_Cart, Metadata } from "../../imports/General_Global_Import";

const Cart_Screen = () => {
  const { cart } = useSelector((state) => ({
    ...state.Cart_user,
  }));
  return (
    <React.Fragment>
      <Metadata title={`Cart`} />
      <div className="container">
        <Info_Cart />
      </div>
    </React.Fragment>
  );
};

export default Cart_Screen;
