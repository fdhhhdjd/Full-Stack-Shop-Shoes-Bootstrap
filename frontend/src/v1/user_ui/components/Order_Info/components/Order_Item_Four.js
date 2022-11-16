import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Order_Item_Four = ({ order_detail, routeId }) => {
  const [sumQuantity, setSumQuantity] = useState(0);
  const ShowTotalQuantity = () => {
    let arr = [];
    order_detail.cart.map((item) => {
      arr.push(Number(item.quantity));
    });
    const sum = arr.reduce((partialSum, a) => partialSum + a, 0);
    setSumQuantity(sum);
  };
  useEffect(() => {
    ShowTotalQuantity();
  }, [routeId]);
  return (
    <React.Fragment>
      <div className="row order-products justify-content-between">
        <div className="col-lg-9 flex-column ">
          {order_detail.cart &&
            order_detail.cart.map((rs) => {
              return rs.cart.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div className="col-lg-8">
                      <>
                        <div className="order-product row" key={index}>
                          <div className="col-md-3 col-6">
                            <img src={item.image?.url} alt={item.name} />
                          </div>
                          <div className="col-md-5 col-6 d-flex align-items-center">
                            <Link to={`/product/${item._id}`}>
                              <h6>{item.name}</h6>
                            </Link>
                          </div>
                          <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                            <h4>QUANTITY</h4>
                            <h6>{rs.quantity}</h6>
                          </div>
                          <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                            <h4>SUBTOTAL</h4>
                            <h6>${rs.quantity * item.price}</h6>
                          </div>
                        </div>
                      </>
                    </div>
                  </Fragment>
                );
              });
            })}
        </div>
        {order_detail.cart && (
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>{order_detail.cart.length}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  {order_detail.status ? <td>Paid on</td> : <td>Paid in</td>}
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>
                    {(order_detail.order_status === 'Delivered' && (
                      <span className="badge btn-success">Delivered</span>
                    )) ||
                      (order_detail.order_status === 'On Delivery' && (
                        <span className="badge btn-warning">On Delivery</span>
                      )) ||
                      (order_detail.order_status === 'Ordered' && <span className="badge btn-danger">Ordered</span>)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Quantity</strong>
                  </td>
                  <td>{sumQuantity}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Sale Code Voucher</strong>
                  </td>

                  {order_detail.voucher === 0 ? <td>No</td> : <td>{order_detail.voucher} %</td>}
                </tr>
                <tr>
                  <td>
                    <strong>Cost</strong>
                  </td>
                  {order_detail.voucher === 0 ? (
                    <td>$ {order_detail.cost}</td>
                  ) : (
                    <del style={{ color: 'red' }}>
                      <td>$ {order_detail.cost}</td>
                    </del>
                  )}
                </tr>
                <tr>
                  <td>
                    <strong>Total </strong>
                  </td>
                  {order_detail.voucher === 0 ? (
                    <td>$ {order_detail.total}</td>
                  ) : (
                    <td style={{ color: 'green' }}>$ {order_detail.discount}</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default memo(Order_Item_Four);
