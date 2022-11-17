import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile_Users_Initial } from '../../../redux/authentication_slice/Api_Redux_Thunk';
import STORAGES from '../../../utils/storage';
const UserApi = () => {
  const { accessToken, update_users } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken || update_users) {
      const token_localStorage = STORAGES.getLocalStorage('accessToken');
      dispatch(Profile_Users_Initial(token_localStorage));
    }
  }, [accessToken, update_users]);

  return {};
};
export default UserApi;
