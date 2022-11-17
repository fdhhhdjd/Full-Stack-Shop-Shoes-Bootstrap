import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { Delete_Flag_History_Order_Initial } from '../../../redux/order_slice/Api_Redux_Thunk_Order';
import STORAGES from '../../../utils/storage';
import { True_Png, Cat_Gif } from '../../imports/Assets_Import';
import Loading_Button from '../General_Loading/Loading_Button';
import { reset_order_delete } from '../../../redux/order_slice/order_slice';
const Order_Info = () => {
  const { order, loading } = useSelector((state) => ({ ...state.order_user }));
  const { profile } = useSelector((state) => ({
    ...state.auth_user,
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = STORAGES.getLocalStorage('accessToken');

  const handleDeleteOrder = (id) => {
    try {
      return swal({
        title: 'Are you sure you want delete ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          Swal.fire({
            title: 'Please Enter Password !!',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Enter',
            confirmButtonColor: '#1cb803',
            showLoaderOnConfirm: true,
            preConfirm: (checkPass) => {
              return dispatch(Delete_Flag_History_Order_Initial({ id, accessToken, password: checkPass }))
                .then((rs) => {
                  dispatch(reset_order_delete());
                })
                .catch((error) => {
                  console.log(error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Admin Thank You 😊!!',
                imageUrl: `${profile && profile.image.url}`,
                width: 400,
                padding: '3em',
                color: '#716add',
                background: `#fff url(${True_Png}) `,
                backdrop: `
                    rgba(0,0,123,0.4)
                    url(${Cat_Gif})
                    left top
                    no-repeat
                  `,
              });
            }
          });
        } else {
          swal("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {' '}
      <div className="table-responsive">
        {loading ? (
          <Loading_Button />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>VOUCHER</th>
                <th>DISCOUNT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.history.map((order) => (
                  <tr className={`${order.status ? 'alert-success' : 'alert-danger'}`} key={order._id}>
                    <td>
                      <Link to={`/order/${order._id}`} className="link">
                        {order._id}
                      </Link>
                    </td>
                    <td>
                      {(order.order_status === 'Delivered' && <span className="badge btn-success">Delivered</span>) ||
                        (order.order_status === 'On Delivery' && (
                          <span className="badge btn-warning">On Delivery</span>
                        )) ||
                        (order.order_status === 'Ordered' && <span className="badge btn-danger">Ordered</span>)}
                    </td>
                    <td>{order.isPaid ? moment(order.paidAt).calendar() : moment(order.createdAt).calendar()}</td>
                    <td>${order.cost}</td>
                    <td>{order.voucher === 0 ? '0' : order.voucher} %</td>
                    {order.voucher === 0 ? <td>$0</td> : <td>${order.discount}</td>}
                    <td className="text-align-center">
                      &nbsp;&nbsp;&nbsp;
                      {order.order_status == 'On Delivery' || order.order_status == 'Delivered' ? (
                        <i
                          className="fas fa-eye"
                          onClick={() => navigate(`/order/${order._id}`)}
                          style={{ cursor: 'pointer' }}
                        ></i>
                      ) : (
                        <i className="fa-solid fa-trash-can" onClick={() => handleDeleteOrder(order._id)}></i>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default Order_Info;
