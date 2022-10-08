import {
  Login_Users,
  Login_Mobile_Otp,
} from "../user_ui/imports/Authen_Users_Import";
import { Home_Users } from "../user_ui/imports/Page_Layout_Main_Import";
const RoutesDataUser = [
  //* Authentication Users
  {
    path: "login",
    // private: <PrivateRouterAuth />,
    main: <Login_Users />,
  },
  {
    path: "loginphone",
    // private: <PrivateRouterAuth />,
    main: <Login_Mobile_Otp />,
  },
  //* Home
  {
    path: "",
    // private: <PrivateRouterAuth />,
    main: <Home_Users />,
  },
];
export default RoutesDataUser;
