import React from 'react';
import '../../../styles/Phone_Right/PhoneRight.css';
const PhoneRight = () => {
  return (
    <React.Fragment>
      <div className="alo-now">
        <a href="tel:0798805741">
          <span className="alo-phone">
            <span className="animated infinite zoomIn alo-ph-circle"></span>
            <span className="animated infinite pulse alo-ph-circle-fill"></span>
            <span className="animated infinite tada alo-ph-img-circle"></span>
          </span>
        </a>
      </div>
    </React.Fragment>
  );
};

export default PhoneRight;
