import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Create_Comment_Initial } from "../../../redux/comment_Slice/Api_Redux_Thunk_Comment";
import { reset_review_error } from "../../../redux/comment_Slice/Comment_Slice";
import STORAGES from "../../../utils/storage";
import {
  Message_Error,
  SwaleMessage,
} from "../../imports/General_Global_Import";
const Write_Review_Product = () => {
  const accessToken = STORAGES.getLocalStorage("accessToken");
  const initialState = {
    comment: "",
    rating: 0,
  };
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const { comment, rating } = state;
  const { id } = useParams();

  const { loading, error } = useSelector((state) => ({
    ...state.Comment_product,
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      return SwaleMessage("Please Content or Star Comment 🤗 ", "error");
    }
    dispatch(Create_Comment_Initial({ id, rating, comment, accessToken }));
  };
  useEffect(() => {
    if (error) {
      SwaleMessage(error.element.msg, "error");
      let timer = setTimeout(() => {
        dispatch(reset_review_error());
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);
  return (
    <React.Fragment>
      <div className="col-md-6" id="scroll_smooth">
        <h6>WRITE A CUSTOMER REVIEW</h6>
        {accessToken ? (
          <form onSubmit={handleSubmitComment}>
            <div className="my-4">
              <strong>Rating</strong>
              <select
                value={rating}
                name="rating"
                onChange={handleChange}
                className="col-12 bg-light p-3 mt-2 border-0 rounded"
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="my-4">
              <strong>Comment</strong>
              <textarea
                row="3"
                value={comment}
                name="comment"
                onChange={handleChange}
                className="col-12 bg-light p-3 mt-2 border-0 rounded"
              ></textarea>
            </div>
            <div className="my-3">
              <button
                className="col-12 bg-black border-0 p-3 rounded text-white"
                disabled={loading ? true : false}
              >
                SUBMIT
              </button>
            </div>
          </form>
        ) : (
          <div className="my-3">
            <Message_Error variant={"alert-warning"}>
              Please{" "}
              <Link to="/login">
                " <strong>Login</strong> "
              </Link>{" "}
              to write a review{" "}
            </Message_Error>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Write_Review_Product;
