import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Check_Stock_Product_Initial, Check_Total_Cart_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../../../utils/storage';
const Check_Stock = () => {
    const { total_user, stock_transaction } = useSelector((state) => ({ ...state.payment_user }));

    const dispatch = useDispatch();
    const accessToken = STORAGES.getLocalStorage("accessToken");

    const checkCountInStock = async () => {
        dispatch(Check_Stock_Product_Initial(accessToken))
    };
    return (
        <React.Fragment>
            <button className="paypal" onClick={checkCountInStock}>
                Check Count In Stock
            </button>
        </React.Fragment>
    )
}

export default Check_Stock