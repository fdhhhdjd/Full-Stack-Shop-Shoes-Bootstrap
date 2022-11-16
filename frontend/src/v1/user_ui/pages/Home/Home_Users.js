import React from 'react';
import { useSelector } from 'react-redux';
import { Metadata } from '../../imports/General_Global_Import';
import {
  Carousels,
  ContactInfo,
  Footer,
  Help_User_Button,
  InfoPhone,
  Product,
} from '../../imports/Page_Layout_Main_Import';
const Home_Users = () => {
  const { accessToken } = useSelector((state) => ({
    ...state.auth_user,
  }));
  return (
    <React.Fragment>
      <Metadata title={`Home Page`} />
      {!accessToken && <Carousels />}
      <Product />
      <Help_User_Button />
      <ContactInfo />
      <Footer />
      <InfoPhone />
    </React.Fragment>
  );
};

export default Home_Users;
