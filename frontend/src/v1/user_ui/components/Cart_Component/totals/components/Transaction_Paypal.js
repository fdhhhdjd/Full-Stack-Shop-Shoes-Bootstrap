import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Transaction_Payment_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../../../utils/storage';
import { Paypal, Check_Stock } from '../../../../imports/General_Global_Import'
const Transaction_Paypal = () => {
  const { stock_transaction, total_payment, transaction } = useSelector((state) => ({ ...state.payment_user }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = STORAGES.getLocalStorage("accessToken");

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    dispatch(Transaction_Payment_Initial({ accessToken, paymentID, address }))
  };
  useEffect(() => {
    if (transaction) {
      navigate("/transaction/success")
    }
  }, [transaction])

  return (
    <React.Fragment>
      <div className="cart-buttons d-flex align-items-center row">
        <Link to="/" className="col-md-6 ">
          <button>Continue To Shopping.</button>
        </Link>
        <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
          {stock_transaction && total_payment ? (
            <button className="paypal">
              <Paypal total={total_payment.total} tranSuccess={tranSuccess} />
            </button>
          ) : (
            <Check_Stock />
          )}
        </div>

      </div>
    </React.Fragment>
  )
}

export default Transaction_Paypal