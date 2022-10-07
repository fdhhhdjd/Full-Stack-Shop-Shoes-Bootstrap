import {
  Login_user,
  Login_phone,
  Register_user,
} from "../user_ui/imports/user_authentication_import";
import { PrivateRouterAuth } from "../user_ui/imports/general_import";
import { Home } from "../user_ui/imports/lay_out_main_import";
const RoutesDataUser = [
  //* Authentication
  {
    path: "login",
    // private: <PrivateRouterAuth />,
    main: <Login_user />,
  },
  {
    path: "login/mobile",
    // private: <PrivateRouterAuth />,
    main: <Login_phone />,
  },
  {
    path: "register",
    private: <PrivateRouterAuth />,
    main: <Register_user />,
  },
  //* Home
  {
    path: "",
    // private: <PrivateRouterAuth />,
    main: <Home />,
  },
];
export default RoutesDataUser;
