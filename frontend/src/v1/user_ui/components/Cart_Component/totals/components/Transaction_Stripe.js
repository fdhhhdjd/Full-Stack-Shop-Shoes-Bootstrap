import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Transaction_Payment_Stripe_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../../../utils/storage';

const Transaction_Stripe = () => {
    const dispatch = useDispatch();
    const { transaction_stripe } = useSelector((state) => ({ ...state.payment_user }));

    const accessToken = STORAGES.getLocalStorage("accessToken");

    const handlePaymentStripe = () => {
        if (accessToken) {
            dispatch(Transaction_Payment_Stripe_Initial(accessToken))
        }
    }
    useEffect(() => {
        if (transaction_stripe) {
            window.location.href = `${transaction_stripe.payment_url}`;
        }
    }, [transaction_stripe])
    return (
        <button className="stripe" onClick={handlePaymentStripe}>
            Transaction_Stripe
        </button>
    )
}

export default Transaction_Stripe