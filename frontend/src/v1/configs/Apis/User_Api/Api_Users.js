const API_USERS = {
  //* Login
  LOGIN_EMAIL_PHONE: "/api/user/login",
  LOGIN_PHONE_OTP: "/api/user/login/mobile",
  LOGIN_GOOGLE: "/api/user/login/google",
  LOGIN_FACEBOOK: "/api/user/login/facebook",

  //* New Accept Token
  NEW_ACCESS_TOKEN: "api/user/new/accessToken",
  //* Logout
  LOGOUT_USERS: "/api/user/logout",
  //* Profile
  GET_PROFILE_USER: "/api/user/profile",
};
export default API_USERS;
