import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Detail_User_Cart_Initial } from '../../../redux/cart_slice/Api_Redux_Thunk_Cart';

const Cart_Context = () => {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { transaction } = useSelector((state) => ({ ...state.payment_user }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(Get_Detail_User_Cart_Initial({ accessToken }));
    }
  }, [accessToken]);
  useEffect(() => {
    if (transaction) {
      dispatch(Get_Detail_User_Cart_Initial({ accessToken }));
    }
  }, [transaction]);
  return {};
};
export default Cart_Context;
