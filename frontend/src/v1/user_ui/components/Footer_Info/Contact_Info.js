import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Contact 24/7</h5>
            <a href="tel:0798805741">0798805741</a>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Address</h5>
            <p>Nha Trang,Khánh Hòa</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-fax"></i>
            </div>
            <h5>WebSite Company</h5>
            <a href="https://profile-forme.surge.sh/" target="_blank">
              https://profile-forme.surge.sh/
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
