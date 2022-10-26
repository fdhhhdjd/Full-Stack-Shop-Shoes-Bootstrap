import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tab_Change_Password from "../../components/Auth_Info/Tab_Change_Password";
import Tab_Profile_User from "../../components/Auth_Info/Tab_Profile_User";
import {
  Lazy_Loading_Image,
  Metadata,
} from "../../imports/General_Global_Import";
const Profile_USers = () => {
  const { profile } = useSelector((state) => ({ ...state.auth_user }));
  return (
    <>
      <Metadata title={`${profile && profile.name}`} />
      {profile && (
        <div className="container mt-lg-5 mt-3">
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Profile Detail</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {profile.name}
              </li>
            </ol>
          </nav>
          <div className="row align-items-start">
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <Lazy_Loading_Image url={profile.image.url} />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{profile.name}</strong>
                    </h5>
                    <span className="author-card-position">
                      <>
                        Joined:{" "}
                        <strong>{moment(profile.createAt).format("LL")}</strong>
                      </>
                    </span>
                  </div>
                </div>
              </div>

              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Profile Settings
                    </button>
                    <button
                      className="nav-link "
                      id="v-pills-home-tab1"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home1"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home1"
                      aria-selected="false"
                    >
                      ChangePassword
                    </button>
                    <button
                      className="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Orders List
                      <span className="badge2">
                        {/* {order.history && order.history
            ? order.history.length
            : 0} */}
                      </span>
                    </button>
                    <button
                      className="nav-link "
                      id="v-pills-home-tab2"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home2"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home2"
                      aria-selected="false"
                    >
                      Feed Back
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div
              className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <Tab_Profile_User />
              </div>
              <div
                className="tab-pane fade show "
                id="v-pills-home1"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab1"
              >
                <Tab_Change_Password />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                {/* <Order cartItems={total} /> */}
              </div>
              <div
                className="tab-pane fade show "
                id="v-pills-home2"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab2"
              >
                {/* <Feedback /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile_USers;
