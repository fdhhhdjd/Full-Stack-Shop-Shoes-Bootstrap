import React from "react";
import { useSelector } from "react-redux";

const Total_Cart = () => {
  const { total_user } = useSelector((state) => ({ ...state.payment_user }));
  return (
    <React.Fragment>
      {total_user.total_apply_voucher !== 0 && (
        <div className="total">
          <span className="sub">Cost:</span>
          <del>
            <span className="divider total-price" style={{ color: "red" }}>
              ${total_user.total_apply_voucher}
            </span>
          </del>
        </div>
      )}
      {/* {percent !== undefined && (
        <div className="total">
          <span className="sub">percent:</span>

          <span className="divider total-price" style={{ color: "green" }}>
            {percent}%
          </span>
        </div>
      )} */}
      <div className="total">
        <span className="sub">Total</span>
        <span className="total-price">
          $
          {total_user.total_apply_voucher !== 0
            ? total_user.total_apply_voucher
            : total_user.total}
        </span>
      </div>

      <hr />
    </React.Fragment>
  );
};

export default Total_Cart;
