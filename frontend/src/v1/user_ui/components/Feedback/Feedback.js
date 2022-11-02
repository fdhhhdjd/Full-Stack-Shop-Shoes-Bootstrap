import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Send_FeedBack_Initial } from '../../../redux/feedback_slice/Api_Redux_Thunk_Feedback';
import { reset_feedback } from "../../../redux/feedback_slice/Feedback_Slice";
import Loading_Button from '../General_Loading/Loading_Button';
import SwaleMessage from '../SwaleMessage/SwaleMessage';
const Feedback = () => {
  const initialState = {
    fullname: "",
    email: "",
    content: "",
    subject: "",
  };
  const { loading, feedback_data } = useSelector((state) => ({ ...state.feedback_user }))
  const { profile } = useSelector((state) => ({
    ...state.auth_user,
  }));
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { fullname, email, content, subject } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!fullname || !email || !subject || !content) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(Send_FeedBack_Initial({ fullname, email, content, subject }))
  };
  useEffect(() => {
    if (feedback_data) {
      setState({ content: "", subject: "" });
      SwaleMessage(feedback_data?.msg, "success");
      setTimeout(() => {
        dispatch(reset_feedback())
      }, 1000)
    }
  }, [feedback_data])

  useEffect(() => {
    if (profile) {
      setState({
        fullname: profile.name,
        email: profile.email,
      });
    }
  }, [profile]);

  return (
    <React.Fragment>
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Full Name</label>
            <input
              className="form-control"
              type="type"
              required
              value={fullname}
              name="fullname"
              onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Email</label>
            <input
              className="form-control"
              type="type"
              value={email}
              name="email"
              onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Subject</label>
            <input
              className="form-control"
              type="type"
              value={subject || ""}
              name="subject"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Content</label>
            <textarea
              className="form-control"
              cols="10"
              rows="5"
              value={content || ""}
              name="content"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {loading ? <Loading_Button /> : <button type="submit">Send Feedback</button>}
      </form></React.Fragment>
  )
}

export default Feedback