import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Update_Info_Users_Initial } from "../../../redux/authentication_slice/Api_Redux_Thunk";
import STORAGES from "../../../utils/storage";
import useUploadCloud from "../../custom_hook/useUploadCloud";
import {
  Loading_Button,
  SwaleMessage,
} from "../../imports/General_Global_Import";
const initialState = {
  name: "",
  phone_number: "",
  sex: "",
  date_of_birth: "",
};
const Tab_Profile_User = () => {
  const [states, setState] = useState(initialState);

  const dispatch = useDispatch();
  const accessToken = STORAGES.getLocalStorage("accessToken");

  const { result, loading } = useSelector((state) => ({
    ...state.upload_cloud,
  }));
  const { profile } = useSelector((state) => ({
    ...state.auth_user,
  }));

  const { handleUpload, handleDestroy } = useUploadCloud(accessToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      Update_Info_Users_Initial({
        states,
        image: {
          public_id: result ? result?.public_id : profile.image.public_id,
          url: result ? result?.url : profile.image.url,
        },
        accessToken,
      })
    )
      .then((item) => {
        SwaleMessage(item.payload.element.msg, "success");
      })
      .catch((err) => {
        SwaleMessage(err.payload.element.msg, "error");
      });
  };
  useEffect(() => {
    if (profile) {
      setState({ ...profile });
    }
  }, [profile]);

  const styleUpload = {
    display: result ? "block" : "none",
  };
  return (
    <>
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-12 img-thumbnail">
          <div className="author-card pb-0 pb-md-3">
            <div className="author-card-cover"></div>
            <div className="author-card-profile row">
              <div className="author-avatar col-md-4">
                {!result &&
                  (loading ? (
                    ""
                  ) : (
                    <img
                      src={profile.image.url}
                      alt=""
                      className="img-thumbnail"
                    />
                  ))}
                {loading ? (
                  <Loading_Button />
                ) : (
                  <>
                    <img
                      src={result?.url}
                      alt=""
                      style={styleUpload}
                      className="img-thumbnail"
                    />
                  </>
                )}
              </div>
              {result ? (
                <div className="author-card-details col-md-2">
                  <h5 className="author-card-name mb-2" onClick={handleDestroy}>
                    <i className="fa fa-window-close close-upload"></i>
                  </h5>
                </div>
              ) : (
                <div className="author-card-details col-md-2">
                  <h5 className="author-card-name mb-2 mt-5">
                    <div className="wrapper">
                      <div className="file-upload">
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          className="upload-file-cloud"
                          onChange={handleUpload}
                        />
                        <i className="fa-solid fa-file-arrow-up"></i>
                      </div>
                    </div>
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={states.name || ""}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={states.email || ""}
              name="email"
              disabled
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Phone Number</label>
            <input
              className="form-control"
              type="text"
              value={states.phone_number || ""}
              name="phone_number"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="gioitinh">Gender</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="1"
              id="sex"
              name="sex"
              checked={states.sex == 1 || ""}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Nam
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="0"
              id="sex"
              name="sex"
              checked={states.sex == 0 || ""}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Nữ
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Date or Birth</label>
            <input
              className="form-control"
              type="date"
              name="date_of_birth"
              value={states.date_of_birth}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default Tab_Profile_User;
