import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaData = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
