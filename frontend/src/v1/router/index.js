import {
  Login_Users,
  Login_Mobile_Otp,
  Register_Users,
  Forget_Password_Users,
  Reset_Password_Users,
  Profile_USers,
  Profile_Customers,
} from "../user_ui/imports/Authen_Users_Import";
import {
  Cart_Screen,
  Order_Screen,
  Detail_Product,
  Home_Users,
} from "../user_ui/imports/Page_Layout_Main_Import";
import User_Private_Router from "../private/user_private_router/User_Private_Router";
import User_Private_Router_Layout_Main from "../private/user_private_router/User_Private_Router_Layout_Main";
import Transaction_Success from "../user_ui/components/Cart_Component/totals/components/Transaction_Success";
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
  //* Detail Products
  {
    path: "info/customer/:id",
    main: <Profile_Customers />,
  },
  //* Profile
  {
    path: "profile",
    private: <User_Private_Router_Layout_Main />,
    main: <Profile_USers />,
  },
  //* Cart Users
  {
    path: "cart",
    private: <User_Private_Router_Layout_Main />,
    main: <Cart_Screen />,
  },
  //* Detail order
  {
    path: "order/:id",
    private: <User_Private_Router_Layout_Main />,
    main: <Order_Screen />,
  },
  //* Transaction Success
  {
    path: "payment/:type/success/:id",
    private: <User_Private_Router_Layout_Main />,
    main: <Transaction_Success />,
  },
];
export default RoutesDataUser;
