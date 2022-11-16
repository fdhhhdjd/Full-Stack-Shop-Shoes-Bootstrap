import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check_Stock_Product_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import { reset_stock_transaction } from '../../../../../redux/payment_slice/payment_slice';
import STORAGES from '../../../../../utils/storage';
import SwaleMessage from '../../../SwaleMessage/SwaleMessage';
const Check_Stock = () => {
  const { error } = useSelector((state) => ({ ...state.payment_user }));

  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage('accessToken');

  const checkCountInStock = async () => {
    dispatch(Check_Stock_Product_Initial(accessToken));
  };
  useEffect(() => {
    if (error) {
      error?.outOfStock.map((rs) => {
        return SwaleMessage(`OutOfStock: ${rs.outOfStock} ---- Stock: ${rs.stock}`, 'warning');
      });
    }
    dispatch(reset_stock_transaction());
  }, [error]);
  return (
    <React.Fragment>
      <button className="paypal" onClick={checkCountInStock}>
        Check Count In Stock
      </button>
    </React.Fragment>
  );
};

export default Check_Stock;
