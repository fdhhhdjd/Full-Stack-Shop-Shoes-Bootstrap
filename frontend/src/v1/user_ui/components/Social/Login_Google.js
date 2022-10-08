import React, { memo } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CONFIGS from "../../../configs/config";
import { Login_Google_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";

const Login_Google = () => {
  const dispatch = useDispatch();
  const HandleGoogle = (response) => {
    if (response.error) {
      return toast.error(response.error);
    } else {
      dispatch(Login_Google_Initial(response));
    }
  };
  return (
    <React.Fragment>
      <GoogleLogin
        clientId={CONFIGS.REACT_APP_KEY_GOOGLE}
        buttonText="Login Google +"
        onSuccess={HandleGoogle}
        onFailure={HandleGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </React.Fragment>
  );
};

export default memo(Login_Google);
