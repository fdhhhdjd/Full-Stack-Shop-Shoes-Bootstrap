import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Profile_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import STORAGES from "../../../utils/storage";
const UserApi = () => {
  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage("accessToken");
  useLayoutEffect(() => {
    if (accessToken) {
      dispatch(Profile_Users_Initial(accessToken));
    }
  }, [accessToken]);

  return {};
};
export default UserApi;
