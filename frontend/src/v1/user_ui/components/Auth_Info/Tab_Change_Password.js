import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Change_Password_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import { reset_changePassword } from "../../../redux/authentication_slice/AuthenticationSlice";
import STORAGES from "../../../utils/storage";
import {
  Loading_Button,
  Message_Auth,
  SwaleMessage,
} from "../../imports/General_Global_Import";
const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const Tab_Change_Password = () => {
  const [state, setState] = useState(initialState);
  const { auth, loading, error } = useSelector((state) => ({
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
      SwaleMessage(error?.element.msg, "error");
    }
    if (auth.length > 0) {
      SwaleMessage(auth?.msg, "success");
    }

    dispatch(reset_changePassword());
  }, [error]);

  return (
    <>
      {auth.length > 0 && (
        <Message_Auth variant="alert-danger">{auth?.msg}</Message_Auth>
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
    </>
  );
};

export default Tab_Change_Password;
