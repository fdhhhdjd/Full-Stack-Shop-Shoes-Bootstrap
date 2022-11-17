import React from 'react';
import { Car_Gif, Loading_Gif } from '../../imports/Assets_Import';
import { Loading_Page_Style } from '../../../styles/Style_components/Loading_Page_Style';
import { Metadata } from '../../imports/General_Global_Import';
import STORAGES from '../../../utils/storage';
const Loading_Pages_Users = () => {
  const accessToken = STORAGES.getLocalStorage('accessToken');
  return (
    <React.Fragment>
      <Metadata title="Redirect ...." />
      <Loading_Page_Style>
        <div className=" loader-container">
          {accessToken ? <img src={Loading_Gif} alt="loading" /> : <img src={Car_Gif} alt="cart" />}
        </div>
      </Loading_Page_Style>
    </React.Fragment>
  );
};

export default Loading_Pages_Users;
