import styled from 'styled-components';
import { Home_Jpg } from '../../user_ui/imports/Assets_Import';
export const Loading_Page_Style = styled.div`
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    background: url(${Home_Jpg}) no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .fade-out {
    top: -120%;
  }
`;
