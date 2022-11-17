import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { Metadata, runFireworks } from '../../../../imports/General_Global_Import';
import { CartBuySuccessStyle } from '../../../../../styles/Transaction_Style/CartBuySuccessStyle';
import { Transaction_Payment_Stripe_success_Initial } from '../../../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../../../utils/storage';
import { useDispatch } from 'react-redux';
const Transaction_Success = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage('accessToken');
  useEffect(() => {
    runFireworks();
  }, []);
  useEffect(() => {
    if (type === 'stripe') {
      dispatch(Transaction_Payment_Stripe_success_Initial({ accessToken, id }));
    }
  }, [id]);
  return (
    <React.Fragment>
      <CartBuySuccessStyle />
      <Metadata title="Buy-Success" />
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <br />
          <h2>Thank you for your order!</h2>
          <p className="email-msg">Check order your choose Profile continue choose OrderList.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:nguyentientai10@gmail.com">
              nguyentientai10@gmail.com
            </a>
          </p>
          <Link to="/">
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Transaction_Success;
