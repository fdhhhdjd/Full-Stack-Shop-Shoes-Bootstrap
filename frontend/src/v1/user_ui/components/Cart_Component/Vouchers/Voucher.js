import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Detail_User_Payment_Initial } from "../../../../redux/payment_slice/Api_Redux_Thunk_Payment";
import { Add_Voucher_Initial } from "../../../../redux/voucher_slice/Api_Redux_Thunk_Voucher";
import {
  reset_error_voucher,
  reset_voucher,
} from "../../../../redux/voucher_slice/voucher_slice";
import STORAGES from "../../../../utils/storage";
import { SwaleMessage } from "../../../imports/General_Global_Import";

const Voucher = () => {
  const initialState = {
    title: "",
  };
  const [state, setState] = useState(initialState);
  const { title } = state;

  const [clickFlag, setClickFlag] = useState(false);

  const accessToken = STORAGES.getLocalStorage("accessToken");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return SwaleMessage("Please Enter A Voucher", "error");
    }
    dispatch(Add_Voucher_Initial({ title, accessToken }));
  };
  const { loading, error, voucher } = useSelector((state) => ({
    ...state.voucher_user,
  }));
  useEffect(() => {
    if (voucher) {
      dispatch(Get_Detail_User_Payment_Initial(accessToken));
      setClickFlag(false);
      dispatch(reset_voucher());
    }
    if (error) {
      SwaleMessage(error.msg, "error");
      return dispatch(reset_error_voucher());
    }
  }, [voucher, error]);
  return (
    <React.Fragment>
      <form className="total" onSubmit={handleSubmit}>
        {loading ? "" : <span className="sub">Code Voucher:</span>}
        {clickFlag ? (
          <>
            {" "}
            <input
              type="text"
              value={title}
              name="title"
              style={{
                borderRadius: "0.5rem",
                border: "0.5px solid black",
              }}
              onChange={handleChange}
              className="b"
            />
            &nbsp;&nbsp;
            <button className="btn btn-success btn-sm col-md-1">Send</button>
          </>
        ) : (
          <span
            style={{
              color: "blue",
              borderBottom: "1px solid blue",
              cursor: "pointer",
            }}
            onClick={() => setClickFlag(true)}
          >
            Voucher If you want Enter!
          </span>
        )}
      </form>

      {/* <div className="card mb-3">
        <div className="card-body">
          <form>
            <div className="form-group">
              {" "}
              <label>Have coupon?</label>
              <div className="input-group">
                {" "}
                <input
                  type="text"
                  className="form-control coupon"
                  name
                  placeholder="Coupon code"
                />{" "}
                <span className="input-group-append">
                  {" "}
                  <button className="btn btn-primary btn-apply coupon">
                    Apply
                  </button>{" "}
                </span>{" "}
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Voucher;
