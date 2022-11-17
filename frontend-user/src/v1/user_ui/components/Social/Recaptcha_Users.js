import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import CONFIGS from '../../../configs/config';
const Recaptcha_Users = (props, ref) => {
  const grecaptchaObject = window.grecaptcha;
  return (
    <React.Fragment>
      <ReCAPTCHA
        size="invisible"
        ref={ref}
        sitekey={CONFIGS.REACT_APP_KEY_RECAPTCHA_V3}
        theme="light"
        badge="bottomleft"
        grecaptcha={grecaptchaObject}
      />
    </React.Fragment>
  );
};

export default forwardRef(Recaptcha_Users);
