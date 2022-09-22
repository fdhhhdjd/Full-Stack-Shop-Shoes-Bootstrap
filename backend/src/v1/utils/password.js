const bcrypt = require("bcrypt");
const CONSTANT = require("../configs/constants");

module.exports = {
  /**
   * Encode Password
   * @author Nguyen Tiến Tài
   *
   * @param {string} random
   *
   */
  encodePassword: (password) => {
    return bcrypt.hash(password, CONSTANT.SALT_ROUNDS);
  },
  /**
   * Compare Password
   *
   * @returns {boolean} true
   */
  comparePassword: (password_text, password_hash) => {
    return bcrypt.compare(password_text, password_hash);
  },
};
