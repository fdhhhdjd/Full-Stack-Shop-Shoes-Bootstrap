import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Register_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import {
  reset_auth,
  reset_error,
} from "../../../redux/authentication_slice/Authentication_Slice";
import {
  Message_Auth,
  Metadata,
  Loading_Button,
} from "../../imports/General_Global_Import";
const initialState = {
  name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register_Users = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reCaptcha = useRef();
  const grecaptchaObject = window.grecaptcha;
  const { loading, error, auth } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const {
    name,
    email,
    password,
    confirmPassword,
    date_of_birth,
    phone_number,
  } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(
      Register_Users_Initial({
        name,
        email,
        password,
        confirmPassword,
        date_of_birth,
        phone_number,
      })
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (auth.status === 200) {
      reCaptcha.current.reset();
      navigate("/login");
      toast.success(auth?.element?.msg);
      dispatch(reset_auth());
    }
    if (error) {
      toast.error(error.element.msg);
      reCaptcha.current.reset();
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        dispatch(reset_error());
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [auth, error]);
  return (
    <>
      <Metadata title="Register" />
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
            type="type"
            placeholder="Full Name"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="phone"
            placeholder="Phone"
            value={phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Date"
            value={date_of_birth}
            name="date_of_birth"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          <ReCAPTCHA
            size="invisible"
            ref={reCaptcha}
            sitekey={process.env.REACT_APP_KEY_RECAPTCHA_V3}
            theme="light"
            badge="bottomleft"
            grecaptcha={grecaptchaObject}
          />
          {loading ? (
            <Loading_Button />
          ) : (
            <button type="submit">Register</button>
          )}
          <p>
            <Link to="/login">Back Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register_Users;
