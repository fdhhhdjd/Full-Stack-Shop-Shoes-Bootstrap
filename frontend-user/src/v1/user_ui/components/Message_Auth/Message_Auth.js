import React from 'react';

const Message_Auth = ({ variant, children }) => {
  return <div className={`alert ${variant}`}>{children}</div>;
};

Message_Auth.defaultProps = {
  variant: 'alert-info',
};

export default Message_Auth;
