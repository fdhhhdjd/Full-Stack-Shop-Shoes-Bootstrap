import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Decrement_Quantity_Cart_Initial,
  Delete_Cart_Initial,
  Get_Detail_User_Cart_Initial,
  Increment_Quantity_Cart_Initial,
} from '../../../redux/cart_slice/Api_Redux_Thunk_Cart';
import { reset_change_cart, reset_change_error } from '../../../redux/cart_slice/Cart_Slice';
import { Get_Detail_User_Payment_Initial } from '../../../redux/payment_slice/Api_Redux_Thunk_Payment';
import STORAGES from '../../../utils/storage';
import { Lazy_Loading_Image, SwaleMessage, Total_Cart, Voucher } from '../../imports/General_Global_Import';

const Cart_User = () => {
  const { cart, total_quantity, change_cart, error } = useSelector((state) => ({
    ...state.Cart_user,
  }));
  const accessToken = STORAGES.getLocalStorage('accessToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCart = (product_id) => {
    if (!product_id) {
      return SwaleMessage('Delete Fail !!', 'error');
    }
    dispatch(Delete_Cart_Initial({ product_id, accessToken }))
      .then((item) => {
        SwaleMessage('Delete Success !!', 'success');
      })
      .catch((error) => {
        SwaleMessage('Delete Fail !!', 'error');
      });
  };
  const HandleIncrement = (product_id) => {
    dispatch(
      Increment_Quantity_Cart_Initial({
        product_id,
        quantity: 1,
        accessToken,
      }),
    );
  };
  const HandleDecrement = (product_id) => {
    return dispatch(
      Decrement_Quantity_Cart_Initial({
        product_id,
        quantity: '-1',
        accessToken,
      }),
    );
  };
  useEffect(() => {
    if (change_cart) {
      dispatch(Get_Detail_User_Cart_Initial({ accessToken }));
      dispatch(Get_Detail_User_Payment_Initial(accessToken));
      dispatch(reset_change_cart());
    }
  }, [change_cart]);
  useEffect(() => {
    if (error) {
      SwaleMessage(error?.msg, 'warning');
    }
    return dispatch(reset_change_error());
  }, [error]);

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb" className="main-breadcrumb mt-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#" onClick={() => navigate(-1)}>
              Product Detail
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart {`( ${total_quantity.quantity_sum} )`}
          </li>
        </ol>
      </nav>
      <div className=" alert alert-info text-center mt-3">
        Total Cart Products
        <span className="text-success mx-2">({total_quantity.data_length})</span>
      </div>
      {cart &&
        cart.map((item, index) => {
          return (
            <div className="cart-iterm row" key={index}>
              <div
                className="remove-button d-flex justify-content-center align-items-center"
                onClick={() => handleDeleteCart(item.product_id[0]._id)}
              >
                <i className="fas fa-times"></i>
              </div>
              <div className="cart-image col-md-3">
                <Lazy_Loading_Image url={item.product_id[0].image?.url} />
              </div>
              <div className="cart-text col-md-5 d-flex align-items-center">
                <Link to={`/product/${item.product_id[0]._id}`}>
                  <h4>{item.product_id[0].name}</h4>
                </Link>
              </div>
              <div className="cart-qty col-md-2 col-sm-5 mt-md-4 mt-1 mt-md-0 d-flex flex-column justify-content-center">
                <h6>QUANTITY</h6>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button className="btn btn-link px-2" onClick={() => HandleDecrement(item.product_id[0]._id)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  &nbsp;&nbsp;
                  <span className="cart-price mt-3 mt-md-0 col-md-4 align-items-sm-end align-items-start  d-flex flex-column justify-content-center ">
                    {item.quantity}
                  </span>
                  &nbsp;&nbsp;
                  <button className="btn btn-link px-2" onClick={() => HandleIncrement(item.product_id[0]._id)}>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
              <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                <h6>PRICE</h6>
                <h4>${item.product_id[0].price}</h4>
              </div>
            </div>
          );
        })}
      {/* Voucher */}
      <Voucher />
      {/* Total */}
      <Total_Cart />
    </React.Fragment>
  );
};

export default Cart_User;
