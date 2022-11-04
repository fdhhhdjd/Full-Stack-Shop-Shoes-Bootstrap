import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Delete_Comment_Initial,
  Update_Comment_Initial,
} from "../../../redux/comment_Slice/Api_Redux_Thunk_Comment";
import { reset_review } from "../../../redux/comment_Slice/Comment_Slice";
import { Get_Detail_Product_Initial } from "../../../redux/product_slice/Api_Redux_Thunk_Products";
import { RelatedProductStyle } from "../../../styles/Related/RelatedProductStyle";
import STORAGES from "../../../utils/storage";
import { useContextUser } from "../../contexts/GlobalStateUser";
import { comment_png } from "../../imports/Assets_Import";
import { Rating, SwaleMessage } from "../../imports/General_Global_Import";
const Comment_product = ({ productId }) => {
  const initialState = {
    comment: "",
    commentId: "",
  };
  const [comments, setComment] = useState(initialState);
  const { comment } = comments;
  const [visible, setVisible] = useState(4);

  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage("accessToken");

  const State_User = useContextUser();
  const [edit, setEdit] = State_User.Product_Api_Context.edit_comment;

  const navigate = useNavigate();
  const { result_product_detail } = useSelector((state) => ({
    ...state.Products_user,
  }));
  const { profile } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const { reviews, review_edit } = useSelector((state) => ({
    ...state.Comment_product,
  }));

  const { id } = useParams();
  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };
  const ScrollToBottom = () => {
    const element = document.getElementById("scroll_smooth");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comments, [name]: value });
  };
  const handleDeleteComment = ({ commentId }) => {
    if (!commentId) {
      return SwaleMessage("Comment error 🤗 ", "error");
    }
    dispatch(Delete_Comment_Initial({ productId: id, commentId, accessToken }));
  };
  const handleNavigatePage = (id) => {
    if (id === profile._id) {
      navigate("/profile");
    } else {
      navigate(`/info/customer/${id}`);
    }
  };
  const handleEditComment = (e) => {
    e.preventDefault();
    if (!comment) {
      return SwaleMessage("Please Content Comment 🤗 ", "error");
    }
    dispatch(
      Update_Comment_Initial({
        productId: id,
        commentId: comments.commentId,
        comment,
        accessToken,
      })
    );
  };
  const handleChangeEditComment = () => {
    setEdit(!edit);
  };
  useEffect(() => {
    if (reviews) {
      SwaleMessage(reviews.msg, "success");
    } else if (review_edit) {
      setEdit(false);
      SwaleMessage(review_edit.msg, "success");
    }
    if (reviews || review_edit) {
      console.log(result_product_detail, "result_product_detail")
      setTimeout(() => {
        ScrollToBottom()
      }, [1300])
      return dispatch(reset_review());
    }
    if (edit) {
      result_product_detail?.comment?.reviews.map((rs, index) => {
        if (profile._id === rs.user._id) {
          return setComment({ comment: rs.comment, commentId: rs._id });
        }
      });
    }
  }, [reviews, edit, review_edit]);
  return (
    <React.Fragment>
      <RelatedProductStyle />
      <div className="col-md-6">
        <h6 className="mb-3" id="scroll_smooth">
          REVIEWS {`( ${result_product_detail?.comment?.reviews.length} )`}
        </h6>
        {result_product_detail?.comment?.reviews.length === 0 && (
          <div className="replies">
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded text-center">
              <img
                src={comment_png}
                alt="Admin"
                className="rounded-circle p-1  "
                width={160}
                height={190}
              />
            </div>
          </div>
        )}

        <div className="replies">
          {result_product_detail?.comment?.reviews.map((rs, index) => {
            return (
              <div
                className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                key={index}
              >
                <strong>
                  <img
                    src={rs.user.image.url}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </strong>
                &nbsp;&nbsp;
                <strong onClick={() => handleNavigatePage(rs.user._id)}>
                  {rs.user.name}
                </strong>
                <Rating value={rs.rating} />
                <span>{moment(rs.updatedAt).calendar()}</span>
                <div className="flex-box d-flex justify-content-between align-items-center alert alert-info mt-3">
                  {profile?._id === rs.user._id ? (
                    <React.Fragment>
                      {edit ? (
                        <textarea
                          row="3"
                          name="comment"
                          className="col-10 bg-light p-3 mt-2 border-0 rounded"
                          onChange={handleChange}
                          value={comments.comment}
                          style={{ border: "none" }}
                        ></textarea>
                      ) : (
                        <div className="">{rs.comment}</div>
                      )}
                      <div>
                        {edit ? (
                          <>
                            <i
                              className="a-solid fa fa-arrow-left"
                              onClick={handleChangeEditComment}
                            ></i>
                            &nbsp;&nbsp;&nbsp;
                            <i
                              className="fa-solid fa fa-paper-plane"
                              onClick={handleEditComment}
                            ></i>
                          </>
                        ) : (
                          <React.Fragment>
                            <i
                              className="fa-solid fa fa-edit"
                              onClick={handleChangeEditComment}
                            ></i>
                            &nbsp;&nbsp;&nbsp;
                            <i
                              className="fa-solid fa-trash-can"
                              onClick={() =>
                                handleDeleteComment({ commentId: rs._id })
                              }
                            ></i>
                          </React.Fragment>
                        )}
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className="">{rs.comment}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <nav className="float-center mt-4" aria-label="Page navigation">
          <ul className="pagination  justify-content-center">
            <li className="page-item">
              {result_product_detail?.comment?.reviews &&
                visible < result_product_detail.comment.reviews.length && (
                  <button className="page-link" onClick={handleLoadMore}>
                    Load Comment <i className="fa-solid fa-angle-down"></i>
                  </button>
                )}
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Comment_product;
