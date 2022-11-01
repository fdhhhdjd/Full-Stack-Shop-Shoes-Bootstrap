import React, { memo } from 'react'

const Order_Item_One = ({ order_detail }) => {
    return (
        <React.Fragment>
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                    <div className="col-md-4 center">
                        <div className="alert-success order-box">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <div className="col-md-8 center">
                        <h5>
                            <strong>Customer</strong>
                        </h5>
                        <p>{order_detail.name}</p>
                        <p>
                            <a href={`mailto:${order_detail.email}`}>
                                {order_detail.email}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default memo(Order_Item_One)