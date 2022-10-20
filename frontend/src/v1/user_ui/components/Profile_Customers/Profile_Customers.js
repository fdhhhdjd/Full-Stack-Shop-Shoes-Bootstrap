import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import {
  Lazy_Loading_Image,
  Metadata,
} from "../../imports/General_Global_Import";
import {
  Tab_Change_Password,
  Tab_Profile_User,
} from "../../imports/User_Info_Import";
import "../../../styles/Profile_Customers/Profile_Customers.css";
const Profile_Customers = () => {
  const { profile } = useSelector((state) => ({ ...state.auth_user }));
  return (
    <>
      <div className="container mt-5  img-thumbnail">
        <div className="main-body">
          {/* /Breadcrumb */}
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="author-card-cover"></div>
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center ">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle rounded-circle p-1 bg-success"
                      width={150}
                    />
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">
                        Full Stack Developer
                      </p>
                      <p className="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
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
                      Kenneth Valdez
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">fip@jukmuh.al</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (239) 816-9029
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (320) 380-4539
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Bay Area, San Francisco, CA
                    </div>
                  </div>
                  <hr />
                  <div className="row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile_Customers;
