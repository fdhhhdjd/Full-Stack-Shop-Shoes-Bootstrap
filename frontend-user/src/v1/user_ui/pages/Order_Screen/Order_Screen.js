import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Detail_History_Order_Initial } from '../../../redux/order_slice/Api_Redux_Thunk_Order';
import { reset_order_detail } from '../../../redux/order_slice/order_slice';
import STORAGES from '../../../utils/storage';
import {
  Loading_Button,
  Metadata,
  Order_Item_Four,
  Order_Item_One,
  Order_Item_Three,
  Order_Item_Two,
} from '../../imports/General_Global_Import';

const Order_Screen = () => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order_detail, loading, stock_transaction } = useSelector((state) => ({ ...state.order_user }));
  const navigate = useNavigate();
  const accessToken = STORAGES.getLocalStorage('accessToken');

  const getTotal = useMemo(() => {
    const total = order_detail?.cart.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);
    setQuantity(total);
  }, [order_detail]);

  useEffect(() => {
    if (id) {
      dispatch(Detail_History_Order_Initial({ id, accessToken }));
    }
    if (order_detail) {
      getTotal();
    }
    return () => dispatch(reset_order_detail());
  }, [id]);
  return (
    <React.Fragment>
      <Metadata title={`${order_detail?._id}`} />
      <div className="container">
        {loading ? (
          <Loading_Button />
        ) : (
          order_detail && (
            <React.Fragment>
              <nav aria-label="breadcrumb" className="main-breadcrumb mt-4 ">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#" onClick={() => navigate(-1)}>
                      Profile
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {order_detail._id}
                  </li>
                </ol>
              </nav>
              <div className="row order-detail">
                <Order_Item_One order_detail={order_detail} />
                <Order_Item_Two order_detail={order_detail} />
                <Order_Item_Three order_detail={order_detail} />
              </div>
              <Order_Item_Four order_detail={order_detail} routeId={id} />
            </React.Fragment>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default Order_Screen;
