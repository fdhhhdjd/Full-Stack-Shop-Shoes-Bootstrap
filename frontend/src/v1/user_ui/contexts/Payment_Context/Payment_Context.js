import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Detail_User_Payment_Initial } from "../../../redux/payment_slice/Api_Redux_Thunk_Payment";

const Payment_Context = () => {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(Get_Detail_User_Payment_Initial(accessToken));
    }
  }, [accessToken]);
  return {};
};
export default Payment_Context;
