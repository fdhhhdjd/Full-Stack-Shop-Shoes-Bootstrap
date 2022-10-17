import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  reset_auth,
  reset_error,
} from "../../../redux/authentication_slice/Authentication_Slice";
import { Reset_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import {
  Loading_Button,
  Message_Auth,
  Metadata,
  SwaleMessage,
} from "../../imports/General_Global_Import";
const initialState = {
  password: "",
  confirmPassword: "",
};
const Reset_Password_Users = () => {
  const [state, setState] = useState(initialState);
  const { loading, auth, error } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { token } = useParams();
  const dispatch = useDispatch();
  const { password, confirmPassword } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(Reset_Users_Initial({ token, password, confirmPassword }));
  };
  useEffect(() => {
    if (auth.status === 200) {
      SwaleMessage(`${auth.element.msg}`, "success");
      setState({ password: "", confirmPassword: "" });
      setTimeout(() => {
        window.close();
      }, 1500);
      dispatch(reset_auth());
    }
    if (error) {
      toast.error(error.element.msg);
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        dispatch(reset_error());
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [auth, error]);

  return (
    <>
      <Metadata title="Reset-ShoeShop" />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && (
          <Message_Auth variant="alert-danger">
            {error.element.msg}
          </Message_Auth>
        )}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChangeInput}
          />
          {loading ? <Loading_Button /> : <button type="submit">Reset</button>}
          <p>
            <Link to="/login">Back Login ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Reset_Password_Users;
