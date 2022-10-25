import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Detail_User_Payment_Initial } from "../../../redux/payment_slice/Api_Redux_Thunk_Payment";

const Payment_Context = () => {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { change_cart } = useSelector((state) => ({
    ...state.Cart_user,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken || change_cart) {
      dispatch(Get_Detail_User_Payment_Initial(accessToken));
    }
  }, [accessToken, change_cart]);
  return {};
};
export default Payment_Context;
