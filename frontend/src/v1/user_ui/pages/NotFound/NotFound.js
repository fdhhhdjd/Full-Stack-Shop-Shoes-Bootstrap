import React from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundImg } from "../../imports/assets_import";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src={NotFoundImg}
            alt="Not-found"
          />
          <button
            className="col-md-3 col-sm-6 col-12 btn btn-success mt-5"
            onClick={() => navigate(-1)}
          >
            <span className="text-white text-decoration-none">Back Page.</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
