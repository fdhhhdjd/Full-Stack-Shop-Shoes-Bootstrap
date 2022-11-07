import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import { Transaction_Payment_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../../../utils/storage';
import { Paypal, Check_Stock, TransactionStripe } from '../../../../imports/General_Global_Import'
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
      navigate(`/transaction/paypal/success/${uuidv4()}`)
    }
  }, [transaction])

  return (
    <React.Fragment>
      <div className="cart-buttons d-flex align-items-center row">
        {stock_transaction && total_payment ? (
          <React.Fragment>
            <div className="col-md-6 ">
              <TransactionStripe />
            </div>
            <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
              <button className="paypal">
                <Paypal total={total_payment.total} tranSuccess={tranSuccess} />
              </button>
            </div>
          </React.Fragment>
        ) :
          <React.Fragment>
            <Link to="/" className="col-md-6 ">
              <button>Continue To Shopping.</button>
            </Link>
            <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
              <Check_Stock />
            </div>
          </React.Fragment>
        }
      </div >
    </React.Fragment >
  )
}

export default Transaction_Paypal