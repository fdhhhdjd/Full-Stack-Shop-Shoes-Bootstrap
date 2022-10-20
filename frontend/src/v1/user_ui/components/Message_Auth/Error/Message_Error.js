import React from "react";

const Message_Error = ({ variant, children }) => {
  return <div className={`alert ${variant}`}>{children}</div>;
};

Message_Error.defaultProps = {
  variant: "alert-info",
};

export default Message_Error;
