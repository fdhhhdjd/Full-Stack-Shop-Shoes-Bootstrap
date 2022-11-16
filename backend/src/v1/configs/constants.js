module.exports = {
  //! milisecond / second
  _30_MILLISECOND: 30 * 1000,
  _1_MINUTES: 60 * 1000,
  _5_MINUTES: 5 * 60 * 1000,
  _15_MINUTES: 15 * 60 * 1000,
  _45_MINUTES: 45 * 60 * 1000,
  _1_DAY: 24 * 60 * 60 * 1000,
  _7_DAY: 7 * 24 * 60 * 60 * 1000,
  _1_DAY_S: 24 * 60 * 60,
  _1_HOURS_S: 60 * 60,
  _1_YEAR: 365 * 24 * 60 * 60 * 1000,

  //! Time Redis
  _1_MINUTES_REDIS: 100,
  _15_MINUTES_REDIS: 100 * 15,
  _1_HOURS_REDIS: 4500,
  _1_DAYS_REDIS: 108000,
  _7_DAYS_REDIS: 6 * 108000,

  _DEFAULT_CACHE_TIME: 15,

  //!Delete Flag
  DELETED_ENABLE: true,
  DELETED_DISABLE: false,

  //! Role Number
  ACCOUNT_USER: 0,
  ACCOUNT_ADMIN: 1,

  //! Bcrypt setting
  SALT_ROUNDS: 10,

  //! Reset Token
  CRYPTO_TOKEN: 20,

  //! EXPIRES_TOKEN
  EXPIRES_ACCESS_TOKEN: process.env.EXPIRES_ACCESS_TOKEN,
  EXPIRES_REFRESH_TOKEN: process.env.EXPIRES_REFRESH_TOKEN,

  //! KEY_SESSION
  KEY_SESSION: process.env.KEY_SESSION,

  //! Algolia 
  NAME_INDEX_ALGOLIA: 'product_search',

  //! STATUS_CODE
  STATUS_CODE_100: "Continue",
  STATUS_CODE_101: "Switching Protocols",
  STATUS_CODE_102: "Processing",
  STATUS_CODE_103: "Early Hints",
  STATUS_CODE_200: "Success",
  STATUS_CODE_201: "Created Success",
  STATUS_CODE_202: "Accepted",
  STATUS_CODE_203: "Non-Authoritative Information",
  STATUS_CODE_204: "No Content",
  STATUS_CODE_302: "Phone is empty",
  STATUS_CODE_305: "User not found",
  STATUS_CODE_306: "Phone is not exists",
  STATUS_CODE_307: "Email is not exists",
  STATUS_CODE_308: "Invalid is empty",
  STATUS_CODE_400: "Request not valid NotFound ",
  STATUS_CODE_401: "Unauthorized Correct",
  STATUS_CODE_403: "Wrong password",
  STATUS_CODE_404: "Not Found",
  STATUS_CODE_503: "Server Busy",
  STATUS_CODE_DEFAULT: "No Code",

  //! Status account
  STATUS_LOGIN_GOOGLE: "google",
  STATUS_LOGIN_FACEBOOK: "facebook",
  STATUS_LOGIN_PHONE: "phone",
  STATUS_LOGIN_EMAIL: "email",
  //! Connect Take Data
  STORAGE_GRAPH_FACEBOOK:
    "https://graph.facebook.com/v13.0/${userID}/?fields=picture.width(300).height(300),id,name,email&access_token=${accessToken}",
};
