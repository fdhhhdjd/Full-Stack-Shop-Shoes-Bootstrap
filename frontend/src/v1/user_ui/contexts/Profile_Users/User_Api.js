import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileInitiate } from "../../../redux/authentication_slice/auth_api";
const UserApi = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { accessToken } = useSelector((state) => ({ ...state.auth_user }));
  useEffect(() => {
    if (accessToken?.accessToken) {
      dispatch(ProfileInitiate({ token: accessToken.accessToken }));
    }
  }, [accessToken]);

  return {
    users: [users, setUsers],
  };
};
export default UserApi;
