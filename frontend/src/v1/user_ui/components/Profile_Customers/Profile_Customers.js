import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Detail_Profile_Account_Comment_Initial } from "../../../redux/comment_Slice/Api_Redux_Thunk_Comment";
import { reset_profile_account } from "../../../redux/comment_Slice/Comment_Slice";
import "../../../styles/Profile_Customers/Profile_Customers.css";
import Loading_Button from "../General_Loading/Loading_Button";
const Profile_Customers = () => {
  const { review_profile, loading } = useSelector((state) => ({
    ...state.Comment_product,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleRandomIcon = () => {
    let icon = ["🔥", "😃", "😍", "😉", "🤑", "🤪", "🤓"];
    const random = Math.floor(Math.random() * icon.length);
    return icon[random];
  };
  const handleCheckNumber = (number) => {
    if (number === 0) {
      return "Khách Mới";
    } else if (number < 10) {
      return "Khách ổn định";
    } else {
      return "Khách Sộp";
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(Detail_Profile_Account_Comment_Initial(id));
    }
    return () => {
      dispatch(reset_profile_account());
    };
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading_Button />
      ) : (
        <>
          <div className="container mt-5 ">
            {review_profile && (
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
                    User {review_profile.info.name}
                  </li>
                </ol>
              </nav>
            )}
            {review_profile && (
              <div className="main-body  img-thumbnail">
                {/* /Breadcrumb */}
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="author-card-cover"></div>
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center ">
                          <img
                            // src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            src={review_profile.info.image.url}
                            alt="Admin"
                            className="rounded-circle p-1 bg-success"
                            width={160}
                            height={190}
                          />
                          <div className="mt-3">
                            <h4 className="mb-1">
                              {review_profile.info.name} {handleRandomIcon()}
                            </h4>
                            <p className="text-secondary mb-1">
                              <b>
                                <i className="fas fa-shopping-cart text-success"></i>{" "}
                                :
                              </b>{" "}
                              {review_profile.order_user === 0
                                ? "Chưa mua hàng"
                                : review_profile.order_user}{" "}
                              {`(${handleCheckNumber(
                                review_profile.order_user
                              )})`}
                            </p>
                            <p className="text-muted font-size-sm">
                              <b>
                                <i
                                  className="fa fa-male"
                                  aria-hidden="true"
                                ></i>{" "}
                                :
                              </b>{" "}
                              {review_profile.info.sex === 0 &&
                                "Nữ (Giới tính)"}
                              {review_profile.info.sex === 1 &&
                                "Nam (Giới tính)"}
                              {!review_profile.info.sex && "Không có dữ liệu"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="author-card-cover"></div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {review_profile.info.name}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {review_profile.info.email}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {review_profile.info.phone_number == ""
                              ? "Không có dữ liệu"
                              : review_profile.info.phone_number}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Male</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {review_profile.info.sex === 0 && "Nữ"}
                            {review_profile.info.sex === 1 && "Nam"}
                            {!review_profile.info.sex && "Không có dữ liệu"}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Date Of Birth</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {review_profile.info.date_of_birth}
                            {!review_profile.info.date_of_birth &&
                              "Không có dữ liệu"}
                          </div>
                        </div>
                        <hr />
                        <div className="row"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile_Customers;
