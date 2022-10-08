import React, { memo } from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import CONFIGS from "../../../configs/config";
import { Login_Facebook_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
const Login_Facebook = () => {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    if (response.accessToken) {
      dispatch(Login_Facebook_Initial(response));
    }
  };
  return (
    <React.Fragment>
      <FacebookLogin
        // appId={CONFIGS.REACT_APP_KEY_FACEBOOK}
        appId={CONFIGS.REACT_APP_KEY_FACEBOOK_TEST}
        autoLoad={false}
        callback={responseFacebook}
        icon="fa-facebook"
        cssClass="btnFacebook"
        textButton="&nbsp;&nbsp;Sign In with Facebook"
      />
    </React.Fragment>
  );
};

export default memo(Login_Facebook);
