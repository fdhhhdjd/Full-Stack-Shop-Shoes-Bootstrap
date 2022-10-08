import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import STORAGES from "../../../utils/storage";
const UserApi = () => {
  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage("accessToken");
  useEffect(() => {
    if (accessToken) {
      dispatch(Profile_Users_Initial(accessToken));
    }
  }, [accessToken]);

  return {};
};
export default UserApi;
