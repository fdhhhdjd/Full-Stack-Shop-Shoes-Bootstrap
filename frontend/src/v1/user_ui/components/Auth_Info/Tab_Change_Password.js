import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Change_Password_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import {
  reset_changePassword,
  reset_error,
} from "../../../redux/authentication_slice/Authentication_Slice";
import STORAGES from "../../../utils/storage";
import {
  Loading_Button,
  Message_Auth,
  SwaleMessage,
} from "../../imports/General_Global_Import";


const Tab_Change_Password = () => {
  const initialState = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const [state, setState] = useState(initialState);
  const { auth_changePassword, loading, error } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { oldPassword, password, confirmPassword } = state;
  const accessToken = STORAGES.getLocalStorage("accessToken");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !confirmPassword) {
      return SwaleMessage("Please enter input !!!", "error");
    }
    dispatch(
      Change_Password_Users_Initial({
        oldPassword,
        password,
        confirmPassword,
        accessToken,
      })
    );
  };
  useEffect(() => {
    if (error) {
      SwaleMessage(`${error?.element.msg}`, "error");
      setTimeout(() => {
        dispatch(reset_error());
      }, 1500);
    }
    if (auth_changePassword) {
      SwaleMessage(`${auth_changePassword?.msg}`, "success");
      dispatch(reset_changePassword());
      setState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [error, auth_changePassword]);

  return (
    <React.Fragment>
      {error && (
        <Message_Auth variant="alert-danger">{error.element.msg}</Message_Auth>
      )}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Old Password</label>
            <input
              className="form-control"
              type="password"
              required
              value={oldPassword || ""}
              name="oldPassword"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password || ""}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword || ""}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
        </div>
        {loading ? (
          <Loading_Button />
        ) : (
          <button type="submit">Update Password</button>
        )}
      </form>
    </React.Fragment>
  );
};

export default memo(Tab_Change_Password);
