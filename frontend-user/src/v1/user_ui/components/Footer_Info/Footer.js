import React, { memo } from 'react';
import FooterData from '../../../utils/data/FooterData';
const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        {FooterData.map((item) => {
          return (
            <div className="card-name" key={item.id}>
              <img alt={item.alt} src={item.img} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Footer);
