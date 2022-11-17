import React, { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Del_Voucher_Initial } from '../../../../redux/voucher_slice/Api_Redux_Thunk_Voucher';
import STORAGES from '../../../../utils/storage';
import { TransactionPaypal } from '../../../imports/General_Global_Import';

const Total_Cart = () => {
  const { total_user } = useSelector((state) => ({ ...state.payment_user }));

  const voucher_end = useRef();
  const dispatch = useDispatch();

  const accessToken = STORAGES.getLocalStorage('accessToken');

  const handleRemoveVoucher = () => {
    dispatch(Del_Voucher_Initial(accessToken));
  };
  useLayoutEffect(() => {
    if (total_user) {
      return voucher_end.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [total_user]);
  return (
    <React.Fragment>
      {total_user && (
        <>
          {total_user.total_apply_voucher !== 0 && (
            <div className="total">
              <span className="sub">Total:</span>
              <del>
                <span className="divider total-price" style={{ color: 'red' }}>
                  ${total_user.total}
                </span>
              </del>
            </div>
          )}
          <div className="total scrollingContainer">
            <span className="sub">percent:</span>
            <span
              className="divider total-price"
              style={total_user.voucher && { color: 'green', marginRight: '.5rem' }}
            >
              {total_user.voucher ? `${total_user.voucher}% OFF` : '0% OFF'}
            </span>
            {total_user.voucher && (
              <span className="divider total-price " style={{ color: 'red' }} onClick={handleRemoveVoucher}>
                <i className="fas fa-times"></i>
              </span>
            )}
          </div>
          {total_user.voucher && (
            <div className="total">
              <span className="total-price">
                <img src="https://i.imgur.com/DC94rZe.png" width={100} />
              </span>
            </div>
          )}

          <div className="total" ref={voucher_end}>
            <span className="sub">{total_user.total_apply_voucher !== 0 ? 'Total Sell :' : 'Total :'}</span>
            <span className="total-price">
              ${total_user.total_apply_voucher !== 0 ? total_user.total_apply_voucher : total_user.total}
            </span>
          </div>
          <hr />

          {/* Transaction Paypal */}
          <TransactionPaypal />
        </>
      )}
    </React.Fragment>
  );
};

export default Total_Cart;
