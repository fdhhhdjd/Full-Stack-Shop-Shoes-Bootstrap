const API_AUTH = {
  //*GET
  new_access_token: "/api/user/new/accessToken",
  logout: "/api/user/logout",
  profile_user: "/api/user/profile",

  //*POST
  login_user_phone: "/api/user/login",
  login_user_google: "/api/user/login/google",
  login_user_facebook: "/api/user/login/facebook",
};
export default API_AUTH;
