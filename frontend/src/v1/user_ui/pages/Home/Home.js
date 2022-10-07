import React from "react";
import Header from "../../components/Headers/Headers";
import { MetaData } from "../../imports/general_import";

const Home = () => {
  return (
    <React.Fragment>
      <MetaData title={`Home Page`} />
      <Header />
    </React.Fragment>
  );
};

export default Home;
