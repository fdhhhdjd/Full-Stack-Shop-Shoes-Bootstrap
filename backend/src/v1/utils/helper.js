const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const CONTAINS = require("../configs/constants");
const CONFIGS = require("../configs/config");
module.exports = {
  /**
   * validate email with emailRegex
   * @author Nguyen Tiến Tài
   *
   * @param {string} email
   *
   * @returns {boolean} true: this email is valid, false: this is not a email
   */
  validateEmail(email) {
    //Validates the email address
    var emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
  },

  /**
   * validate phone number
   *
   * @param {number} phone
   *
   * @returns {boolean}
   */
  isVietnamesePhoneNumber(phone_number) {
    var phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    return phoneRegex.test(phone_number);
  },
  /**
   * Change format date to dd/mm/yyyy
   * @param {date} date
   *
   * @returns {date}
   */
  changeFormatDate: (date) => {
    let datePart = date.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];
    return day + "/" + month + "/" + year;
  },

  /**
   * validate slottime: from_time/to_time format
   *
   * @param {string} time
   *
   * @returns {boolean}
   */
  validateTime(time) {
    var timeRegex = /^(0[0-9]|1[0-9]|2[0-3])(:[0-5]\d)(:[0-5]\d)$/g;
    return timeRegex.test(time);
  },

  /**
   * validate input date format as ISO standard
   *
   * @param {string} date
   *
   * @returns {boolean}
   */
  validateIsoDate(date) {
    var dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;
    return dateRegex.test(date);
  },
  /**
   * validate password
   *
   * @param {string} password
   *
   * @returns {boolean}
   */
  isPassword(password) {
    let reg = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
    ).test(password);
    return reg;
  },
  /**
   * validate date
   * @param {number} phone
   *
   * @returns {boolean}
   */
  validateDate(date_of_birth) {
    let regex = new RegExp(
      "([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})"
    );

    return regex.test(date_of_birth);
  },
  /**
   * randomString
   *
   * @param {number} number
   *
   * @returns {string}
   */

  randomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  /**
   * Time Vietnamese
   *
   *
   * @returns {date}
   */

  getCurrentTimeJP() {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  },
  /**
   * Time Vietnamese
   *
   *
   * @returns {date}
   */

  createToISOString() {
    return new Date().toISOString();
  },

  /** sleep web
   * Time Vietnamese
   *
   * @param {number} headers
   *
   * @returns {number}
   */
  sleep: async (seconds) => {
    return await new Promise((rs, rj) => {
      setTimeout(() => {
        rs(true);
      }, seconds * 1000);
    });
  },
  /** Create access token
   * Time Vietnamese
   *
   * @param {string} headers
   *
   * @returns {string}
   */
  createAccessToken(user) {
    return jwt.sign(user, CONFIGS.ACCESS_TOKEN_SECRET, {
      expiresIn: CONTAINS.EXPIRES_ACCESS_TOKEN,
    });
  },
  /** Create refresh token
   * Time Vietnamese
   *
   * @param {string} headers
   *
   * @returns {string}
   */
  createRefreshToken(user) {
    return jwt.sign(user, CONFIGS.REFRESH_TOKEN_SECRET, {
      expiresIn: CONTAINS.EXPIRES_REFRESH_TOKEN,
    });
  },
  /** Create refresh token
   * Time Vietnamese
   *
   * @param {string} headers
   *
   * @returns {string}
   */
  //* Replace URL
  getURIFromTemplate(template, data) {
    const { userID, accessToken } = data;
    return eval("`" + template.replace(/`/g, "\\`") + "`");
  },
  /** Take user access token
   * Time Vietnamese
   *
   * @param {string} body
   *
   * @returns {object}
   */
  //* Verify AcceptToken
  VerifyAccToken(token) {
    return jwt.verify(token, CONFIGS.ACCESS_TOKEN_SECRET);
  },
  /** Take user access token
   * Time Vietnamese
   *
   * @param {string} body
   *
   * @returns {object}
   */
  //* Verify RefreshToken
  /** verification
   *
   * @param {string} token
   *
   * @returns {string}
   */

  VerifyRefreshToken(token) {
    return jwt.verify(token, CONFIGS.REFRESH_TOKEN_SECRET);
  },
  //*  Decode Password
  /**
   *
   * @param {string} token
   *
   * @returns {string}
   */
  decodeJWT(token) {
    return jwt.decode(token, CONFIGS.JWT_KEY);
  },
  //* Key crypto
  /**
   * @returns {string} random
   */
  resetTokens() {
    return crypto.randomBytes(CONTAINS.CRYPTO_TOKEN).toString("hex");
  },
  //* Key crypto password
  /** token password reset
   * @returns {string} random
   */
  resetPasswordToken(resetToken) {
    return crypto.createHash("sha256").update(resetToken).digest("hex");
  },
  /** Random Number
   * Time Vietnamese
   *
   * @param {number}
   *
   * @returns {number} random 1->100
   */
  randomNumber() {
    return Math.floor(Math.random() * 99) + 1;
  },
};
