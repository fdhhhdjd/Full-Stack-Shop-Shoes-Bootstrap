import React from "react";
import { car, Loading1 } from "../../imports/assets_import";
import { LoadingStyle } from "../../styles/loading/Loading_Style";
import { MetaData } from "../../imports/general_import";
const Loadings = () => {
  const tokenAdmin = window.localStorage.getItem("firstLoginAdmin");
  return (
    <React.Fragment>
      <MetaData title="Redirect ...." />
      <LoadingStyle>
        <div className=" loader-container">
          {tokenAdmin ? (
            <img src={Loading1} alt="" />
          ) : (
            <img src={car} alt="" />
          )}
        </div>
      </LoadingStyle>
    </React.Fragment>
  );
};

export default Loadings;
