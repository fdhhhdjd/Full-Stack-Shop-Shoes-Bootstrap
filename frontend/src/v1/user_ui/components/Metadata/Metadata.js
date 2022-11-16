import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const Metadata = ({ title }) => {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <title>{`Welcome-${title}`}</title>
        </Helmet>
      </HelmetProvider>
    </React.Fragment>
  );
};

export default Metadata;
