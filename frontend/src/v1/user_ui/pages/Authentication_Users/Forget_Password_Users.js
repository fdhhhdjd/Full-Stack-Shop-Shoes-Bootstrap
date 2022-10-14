import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Forget_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import {
  reset_auth,
  reset_error,
} from "../../../redux/authentication_slice/AuthenticationSlice";
import {
  Loading_Button,
  Message_Auth,
  Metadata,
  SwaleMessage,
} from "../../imports/General_Global_Import";
const initialState = {
  email: "",
};
const Forget_Password_Users = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const { email } = state;
  const { loading, auth, error } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter A Valid Email 🥲");
    }
    dispatch(Forget_Users_Initial({ email }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (auth.status === 200) {
      SwaleMessage(`${auth.element.msg}`, "success");
      setState({ email: "" });
      dispatch(reset_auth());
    }
    if (error) {
      toast.error(error.element.msg);
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(reset_error());
      }, 3000);
    }
  }, [auth, error]);

  return (
    <>
      <Metadata title="Forget" />
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
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />

          {loading ? <Loading_Button /> : <button type="submit">Forget</button>}

          <p>
            <Link to="/login">Back Login ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Forget_Password_Users;
