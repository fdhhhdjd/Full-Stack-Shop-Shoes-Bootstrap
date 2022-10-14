const API_USERS = {
  //* Login
  LOGIN_EMAIL_PHONE: "/api/user/login",
  LOGIN_PHONE_OTP: "/api/user/login/mobile",
  LOGIN_GOOGLE: "/api/user/login/google",
  LOGIN_FACEBOOK: "/api/user/login/facebook",

  //* Register
  REGISTER_USERS: "/api/user/register",

  //* Forget
  FORGET_PASSWORD_USERS: "/api/user/forget",

  //* Forget
  RESET_PASSWORD_USERS: "/api/user/password/reset",

  //* New Accept Token
  NEW_ACCESS_TOKEN: "/api/user/new/accessToken",

  //* Logout
  LOGOUT_USERS: "/api/user/logout",

  //* Profile
  GET_PROFILE_USER: "/api/user/profile",
};
export default API_USERS;
