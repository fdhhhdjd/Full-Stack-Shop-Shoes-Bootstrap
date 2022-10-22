import React from "react";
import { Link } from "react-router-dom";

const Cart_Empty = () => {
  return (
    <React.Fragment>
      <div className=" alert alert-info text-center mt-3">
        Your cart is empty
        <Link
          className="btn btn-success mx-5 px-5 py-3"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          SHOPPING NOW
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Cart_Empty;
