import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import STORAGES from '../../../utils/storage';
import { Metadata, Loading_Button, Message_Auth } from '../../imports/General_Global_Import';
import { Login_Google, Login_Facebook, Recaptcha_Users } from '../../imports/Authen_Users_Import';
import { toast } from 'react-toastify';
import { Login_Email_Phone_Initial } from '../../../redux/authentication_slice/Api_Redux_Thunk';
import { reset_error } from '../../../redux/authentication_slice/Authentication_Slice';
const Login_Users = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const reCaptcha = useRef();
  const { loading, auth, error } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please Enter Input 🥲 !');
    }
    const token = await reCaptcha.current.executeAsync();
    dispatch(Login_Email_Phone_Initial({ email, password, token }));
  };
  useEffect(() => {
    if (auth && auth.status === 200) {
      STORAGES.saveLocalStorage('Login_Users', true);
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    }
    if (error) {
      toast.error(error.msg);
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        reCaptcha.current.reset();
        dispatch(reset_error());
      }, 1800);
      return () => clearInterval(timer);
    }
  }, [auth, error]);
  return (
    <React.Fragment>
      {auth && auth.status === 200 ? <Metadata title="Redirect Home..." /> : <Metadata title="Login" />}
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message_Auth variant="alert-danger">{error.msg}</Message_Auth>}
        <div className="Login col-md-8 col-lg-4 col-11">
          <Login_Google />
          <Login_Facebook />
          <button onClick={() => navigate('/login/mobile')}>Sign In Phone Number</button>
        </div>

        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
          <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
          <br />
          <br />
          <Recaptcha_Users ref={reCaptcha} />
          {loading ? <Loading_Button /> : <button type="submit">Login</button>}
          <p>
            <Link to="/register">Create Account </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Forget">Forget ?</Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login_Users;
