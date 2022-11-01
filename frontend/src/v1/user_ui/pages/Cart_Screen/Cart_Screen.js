import React from "react";
import { Info_Cart, Metadata } from "../../imports/General_Global_Import";

const Cart_Screen = () => {
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
