import {
  Login_Users,
  Login_Mobile_Otp,
  Register_Users,
  Forget_Password_Users,
  Reset_Password_Users,
  Profile_USers,
} from "../user_ui/imports/Authen_Users_Import";
import {
  Detail_Product,
  Home_Users,
} from "../user_ui/imports/Page_Layout_Main_Import";
import User_Private_Router from "../private/user_private_router/User_Private_Router";
import User_Private_Router_Layout_Main from "../private/user_private_router/User_Private_Router_Layout_Main";
const RoutesDataUser = [
  //* Authentication Users
  {
    path: "login",
    private: <User_Private_Router />,
    main: <Login_Users />,
  },
  {
    path: "login/mobile",
    private: <User_Private_Router />,
    main: <Login_Mobile_Otp />,
  },
  {
    path: "register",
    private: <User_Private_Router />,
    main: <Register_Users />,
  },
  {
    path: "forget",
    private: <User_Private_Router />,
    main: <Forget_Password_Users />,
  },
  {
    path: "user/password/reset/:token",
    private: <User_Private_Router />,
    main: <Reset_Password_Users />,
  },
  //* Home
  {
    path: "",
    main: <Home_Users />,
  },
  //* Detail Products
  {
    path: "product/:id",
    main: <Detail_Product />,
  },
  //* Profile
  {
    path: "profile",
    private: <User_Private_Router_Layout_Main />,
    main: <Profile_USers />,
  },
];
export default RoutesDataUser;
