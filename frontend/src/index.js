import React from "react";
import ReactDOM from "react-dom";
import "react-phone-number-input/style.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { DataProviderAdmin } from "./v1/admin_ui/contexts/GlobalStateAdmin";
import store from "./v1/redux/store";
import "./v1/styles/responsive.css";
import { DataProviderUser } from "./v1/user_ui/contexts/GlobalStateUser";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <DataProviderUser>
          <Router>
            <App />
          </Router>
        </DataProviderUser>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
