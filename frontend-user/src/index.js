import React from 'react';
import ReactDOM from 'react-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-phone-number-input/style.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './v1/redux/store';
import './v1/styles/responsive.css';
import { DataProviderUser } from './v1/user_ui/contexts/GlobalStateUser';

ReactDOM.render(
  <Provider store={store}>
    <DataProviderUser>
      <Router>
        <App />
      </Router>
    </DataProviderUser>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
