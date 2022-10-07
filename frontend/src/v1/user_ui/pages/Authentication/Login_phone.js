import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import STORAGE from "../../../utils/storage";
import { Header, MetaData, Loading_Auth } from "../../imports/general_import";
import { Alert, Button, Container, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
const Login_phone = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, auth } = useSelector((state) => ({
    ...state.auth_user,
  }));
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
        const response = await STORAGE.checkUpRecapChaNumberFirebase(number);
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
  }, [auth, error]);
  return (
    <React.Fragment>
      {" "}
      <MetaData title="Login-Phone" />
      <Header />
      <Container style={{ width: "400px" }}>
        <div className="p-4 box">
          <h2 className="mb-3">Login Phone</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {auth.status === 400 && (
            <Alert variant="alert-danger">{auth.msg}</Alert>
          )}
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
                <Loading_Auth />
              ) : (
                <>
                  {/* <Link to="/loginphone"> */}
                  <Button variant="secondary" onClick={() => setFlag(false)}>
                    Cancel
                  </Button>
                  {/* </Link> */}
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
    </React.Fragment>
  );
};

export default Login_phone;
