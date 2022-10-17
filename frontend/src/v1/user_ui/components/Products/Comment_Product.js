import React from "react";
import { Rating } from "../../imports/General_Global_Import";
import moment from "moment";

const Comment_product = ({ comment }) => {
  return (
    <React.Fragment>
      <div className="replies">
        <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
          <strong>
            <img
              src={comment.user.image.url}
              alt=""
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </strong>{" "}
          &nbsp;&nbsp;
          <strong>{comment.user.name}</strong>
          <Rating value={comment.rating} />
          <span>{moment(comment.updatedAt).calendar()}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comment_product;
