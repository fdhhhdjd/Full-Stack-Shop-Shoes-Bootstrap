import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Add_To_Cart_Initial,
  Get_Detail_User_Cart_Initial,
  Update_Quantity_Cart_Initial,
} from "../../../redux/cart_slice/Api_Redux_Thunk_Cart";
import { reset_change_cart } from "../../../redux/cart_slice/Cart_Slice";
import { Get_Detail_Product_Initial } from "../../../redux/product_slice/Api_Redux_Thunk_Products";
import { reset_product_detail } from "../../../redux/product_slice/Product_Slice";
import STORAGES from "../../../utils/storage";
import {
  Comment_Product,
  Loading_Button,
  Metadata,
  Rating,
  Relation_Product,
  SwaleMessage,
  TransformWrappers,
  Write_Review_Product,
} from "../../imports/General_Global_Import";
const Detail_Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = STORAGES.getLocalStorage("accessToken");
  const { result_product_detail, loading } = useSelector((state) => ({
    ...state.Products_user,
  }));

  const { change_cart, cart } = useSelector((state) => ({
    ...state.Cart_user,
  }));

  const handleAddToCart = (product_id, quantity) => {
    var result = handleCheckStock(product_id);
    if (
      result !== undefined &&
      result.length > 0 &&
      result[0].quantity >=
        result_product_detail?.product_detail[0]?.countInStock
    ) {
      return SwaleMessage("Store has sold out !", "warning");
    }
    const checkCart = cart?.some((rs) => product_id === rs.product_id[0]._id);
    if (checkCart) {
      HandleIncrement(product_id, quantity);
    } else {
      return dispatch(
        Add_To_Cart_Initial({ product_id, quantity, accessToken })
      );
    }
  };
  const HandleIncrement = (product_id, quantity) => {
    return dispatch(
      Update_Quantity_Cart_Initial({
        product_id,
        quantity: 1,
        accessToken,
      })
    );
  };
  const handleCheckStock = (product_id) => {
    return cart?.filter((rs) => {
      if (rs.product_id[0]._id === product_id) {
        return rs;
      }
    });
  };
  useEffect(() => {
    if (id) {
      dispatch(Get_Detail_Product_Initial(id));
    }
    return () => {
      dispatch(reset_product_detail());
    };
  }, [id]);
  useEffect(() => {
    if (change_cart) {
      dispatch(Get_Detail_User_Cart_Initial({ accessToken }));
      return SwaleMessage("Add To Cart Success !", "success");
    }
    return () => {
      dispatch(reset_change_cart());
    };
  }, [change_cart]);
  return (
    <React.Fragment>
      <>
        <Metadata title={`${result_product_detail?.product_detail[0]?.name}`} />
        {loading ? (
          <Loading_Button />
        ) : (
          result_product_detail && (
            <div className="container single-product">
              <nav aria-label="breadcrumb" className="main-breadcrumb">
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
                    {result_product_detail?.product_detail[0]?.name}
                  </li>
                </ol>
              </nav>
              <div className="row">
                {/* TransformWrapper */}
                <TransformWrappers
                  url_image={
                    result_product_detail?.product_detail[0]?.image?.url
                  }
                />
                <div className="col-md-6">
                  <div className="product-dtl">
                    <div className="product-info">
                      <div className="product-name">
                        {STORAGES.except(
                          result_product_detail.product_detail[0]?.name,
                          35
                        )}
                      </div>
                    </div>
                    <p>{result_product_detail.product_detail[0].description}</p>

                    <div className="product-count col-lg-7 ">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Price</h6>
                        <span>
                          ${result_product_detail.product_detail[0].price}
                        </span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Status</h6>
                        {result_product_detail.product_detail[0].countInStock >
                        0 ? (
                          <span>In Stock</span>
                        ) : (
                          <span>End In Stock</span>
                        )}
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Sold</h6>
                        {result_product_detail.product_detail[0]?.sold > 0 ? (
                          <span>
                            {result_product_detail.product_detail[0].sold}{" "}
                          </span>
                        ) : (
                          <span>No Yet Has Bought</span>
                        )}
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Reviews</h6>
                        <Rating
                          value={
                            result_product_detail.product_detail[0]?.rating
                          }
                          text={`${result_product_detail.product_detail[0]?.numReviews} reviews`}
                        />
                      </div>
                      {result_product_detail.product_detail[0]?.countInStock >
                      0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>CountIn Stock</h6>
                            <span>
                              {
                                result_product_detail.product_detail[0]
                                  ?.countInStock
                              }
                            </span>
                          </div>
                          <button
                            className="round-black-btn"
                            onClick={() =>
                              handleAddToCart(
                                result_product_detail.product_detail[0]._id,
                                1
                              )
                            }
                          >
                            Add To Cart
                          </button>
                        </>
                      ) : (
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>CountIn Stock</h6>
                          <span style={{ color: "red" }}>Out Of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Relation_Product />
              <div className="row my-5">
                {/* Get Comment */}
                <Comment_Product />

                {/* Write_Review */}
                <Write_Review_Product />
              </div>
            </div>
          )
        )}
      </>
    </React.Fragment>
  );
};

export default Detail_Product;
