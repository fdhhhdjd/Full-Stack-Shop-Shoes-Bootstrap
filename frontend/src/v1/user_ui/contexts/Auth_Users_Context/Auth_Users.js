import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
const UserApi = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  useEffect(() => {
    if (accessToken) {
      dispatch(Profile_Users_Initial({ token: accessToken }));
    }
  }, [accessToken]);

  return {};
};
export default UserApi;
