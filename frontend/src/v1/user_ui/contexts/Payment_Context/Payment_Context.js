import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check_Total_Cart_Initial, Get_Detail_User_Payment_Initial } from "../../../redux/payment_slice/Api_Redux_Thunk_Payment";
import { reset_payment, reset_stock_transaction } from "../../../redux/payment_slice/payment_slice";

const Payment_Context = () => {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { stock_transaction, transaction } = useSelector((state) => ({ ...state.payment_user }));
  const { change_cart } = useSelector((state) => ({
    ...state.Cart_user,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(Get_Detail_User_Payment_Initial(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (stock_transaction) {
      dispatch(Check_Total_Cart_Initial(accessToken))
    }
  }, [stock_transaction])
  useEffect(() => {
    if (transaction) {
      dispatch(reset_payment())
    }
  }, [transaction])
  useEffect(() => {
    if (change_cart) {
      dispatch(reset_stock_transaction())
    }
  }, [change_cart])
  return {};
};
export default Payment_Context;
