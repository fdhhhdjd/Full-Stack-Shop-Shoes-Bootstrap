import { Fragment, useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login_Phone_Otp_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import STORAGES from "../../../utils/storage";
import { Loading_Button, Metadata } from "../../imports/General_Global_Import";
const Login_Mobile_Otp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const { loading, auth } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const dispatch = useDispatch();
  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined) {
      setError("Please enter a valid phone number!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      try {
        const response = await STORAGES.checkRecapChaFirebase(number);
        setResult(response);
        setFlag(true);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) {
      setError("Please enter OTP");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      try {
        await result.confirm(otp);
        dispatch(Login_Phone_Otp_Initial(number));
        setNumber(null);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };
  useEffect(() => {
    if (auth && auth.status === 200) {
      STORAGES.saveLocalStorage("Login_Users", true);
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }
    if (error) {
      toast.error(error.msg);
      window.scrollTo(0, 0);
    }
  }, [auth, error]);
  return (
    <Fragment>
      <Metadata title="Login-Phone" />
      <Container style={{ width: "400px" }}>
        <div className="p-4 box">
          <h2 className="mb-3">Login Phone</h2>
          {error && <Alert variant="danger">{error.msg}</Alert>}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
                name="phone_number"
              />
              <div id="recaptcha-container"></div>
            </Form.Group>
            <div className="button-right">
              <Link to="/login">
                <Button variant="secondary">Cancel</Button>
              </Link>
              &nbsp;
              <Button type="submit" variant="primary">
                Send Otp
              </Button>
            </div>
          </Form>

          <Form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Control
                type="otp"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className="button-right">
              {loading ? (
                <Loading_Button />
              ) : (
                <>
                  <Button variant="secondary" onClick={() => setFlag(false)}>
                    Cancel
                  </Button>
                  &nbsp;
                  <Button type="submit" variant="primary">
                    Verify
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </Container>
    </Fragment>
  );
};

export default Login_Mobile_Otp;
