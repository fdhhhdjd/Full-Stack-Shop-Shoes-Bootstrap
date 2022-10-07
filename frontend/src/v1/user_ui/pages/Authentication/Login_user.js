import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginInitial } from "../../../redux/authentication_slice/auth_api";
import STORAGE from "../../../utils/storage";
import {
  Header,
  Loading_Auth,
  Message,
  MetaData,
} from "../../imports/general_import";
import {
  Login_Facebook,
  Login_Google,
  Recaptcha_user,
} from "../../imports/user_authentication_import";
const Login_user = () => {
  const initialState = {
    email_phone: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const { email_phone, password } = state;
  const reCaptcha = useRef();
  const { loading, auth, error } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email_phone || !password) {
      return toast.error("Please Enter Input 🥲 !");
    }
    const token = await reCaptcha.current.executeAsync();
    dispatch(LoginInitial({ email_phone, password, token }));
  };
  useEffect(() => {
    if (auth?.status) {
      if (auth.status === 200) {
        toast.success("Login User Successfully 🥰");
        STORAGE.saveLocalStorage("login_user", true);
        if (location.state?.from) {
          navigate(location.state.from);
          window.location.reload();
        } else {
          window.location.href = "/";
        }
      }
    }
    if (error) {
      window.scrollTo(0, 0);
      toast.error(error.msg || error.element);
    }
    setTimeout(() => {
      reCaptcha.current.reset();
    }, 1000);
  }, [auth, error]);
  return (
    <React.Fragment>
      <>
        {auth?.status === 200 ? (
          <MetaData title="Redirect Home..." />
        ) : (
          <MetaData title="Login-ShoeShop" />
        )}
        <Header />
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
          {auth?.status === 400 && (
            <Message variant="alert-danger">{auth.msg}</Message>
          )}
          <div className="Login col-md-8 col-lg-4 col-11">
            <Login_Google />
            <Login_Facebook />
            <button onClick={() => navigate("/login/mobile")}>
              Sign In Phone Number
            </button>
          </div>

          <form
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              placeholder="email or phone"
              value={email_phone}
              name="email_phone"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <br />
            <Recaptcha_user ref={reCaptcha} />
            {loading ? <Loading_Auth /> : <button type="submit">Login</button>}
            <p>
              <Link to="/register">Create Account </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/Forget">Forget ?</Link>
            </p>
          </form>
        </div>
      </>
    </React.Fragment>
  );
};

export default Login_user;
