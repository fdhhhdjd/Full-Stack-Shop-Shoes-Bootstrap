import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History_Order_Initial } from "../../../redux/order_slice/Api_Redux_Thunk_Order";
import STORAGES from "../../../utils/storage";
const OrderApi = () => {
    const { accessToken } = useSelector((state) => ({
        ...state.auth_user,
    }));
    const { order_delete } = useSelector((state) => ({ ...state.order_user }))

    const dispatch = useDispatch();
    useEffect(() => {
        if (accessToken || order_delete) {
            const token_localStorage = STORAGES.getLocalStorage("accessToken");
            dispatch(History_Order_Initial(token_localStorage))
        }
    }, [accessToken, order_delete]);

    return {};
};
export default OrderApi;
