import React, { memo } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CONFIGS from "../../../configs/config";
import { LoginGoogleInitial } from "../../../redux/authentication_slice/auth_api";
const LoginGoogle = () => {
  const dispatch = useDispatch();
  const HandleGoogle = (response) => {
    if (response.error) {
      return toast.error(response.error);
    } else {
      dispatch(LoginGoogleInitial(response.tokenId));
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

export default memo(LoginGoogle);
