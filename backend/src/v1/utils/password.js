const bcrypt = require("bcrypt");
const CONSTANTS = require("../configs/constants");

module.exports = {
  /**
   * Encode Password
   * @author Nguyen Tiến Tài
   *
   * @param {string} random
   *
   */
  encodePassword: (password) => {
    return bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
  },
  /**
   * Encode reset password
   *
   * @param {string} random
   *
   */
  encodeResetPassword: async (password, salt) => {
    return bcrypt.hash(password, salt);
  },

  /**
   * Compare Password
   *
   * @returns {boolean} true
   */
  comparePassword: (password_text, password_hash) => {
    return bcrypt.compare(password_text, password_hash);
  },
  /**
   * gen salt
   *
   * @returns {string}
   */
  genSalt: async () => {
    return bcrypt.genSalt(CONSTANTS.SALT_ROUNDS);
  },
};
