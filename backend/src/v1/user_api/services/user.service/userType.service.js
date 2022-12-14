"use strict";
const STORAGE = require("../../../utils/storage");
const PASSWORD = require("../../../utils/password");
const Users = require("../../../models/userModel");
const HELPER = require("../../../utils/helper.js");
const { RedisPub } = require("../../../utils/limited_redis");

module.exports = {
  LoginEmail: async (email_phone, password) => {
    try {
      // const recapCha = await STORAGE.validateHuman(token);
      // if (!recapCha) {
      //   return {
      //     status: 402,
      //     success: false,
      //     element: "You Check RecapCha Fail ",
      //   };
      // }
      const user_email = await STORAGE.checkUserExit(email_phone);
      if (!user_email)
        return {
          status: 305,
          success: false,
        };
      if (user_email.verified === false) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Email hasn't been verified. Please check email inbox",
          },
        };
      }
      const user_password = await PASSWORD.comparePassword(
        password,
        user_email?.password
      );
      if (!user_password) {
        return {
          status: 403,
          success: false,
        };
      }
      return user_email;
    } catch (error) {
      return {
        status: 503,
      };
    }
  },
  LoginPhone: async (email_phone) => {
    try {
      const check_phone = HELPER.isVietnamesePhoneNumber(email_phone);
      if (!check_phone) {
        return {
          status: 306,
          success: false,
        };
      }
      const user_phone = await STORAGE.checkPhoneExit(email_phone);
      return user_phone;
    } catch (error) {
      return {
        status: 503,
      };
    }
  },
  CheckEmail: async (email) => {
    const user_email = await STORAGE.checkUserExit(email);
    return user_email;
  },
  //* Register Login
  RegisterSocial: async ({ name, email, picture, password }) => {
    const password_random = await PASSWORD.encodePassword(password);
    let newUser = new Users({
      name: name,
      email,
      password: password_random,
      image: {
        public_id: STORAGE.createID(),
        url: picture,
      },
      verified: true,
    });
    return Promise.all([newUser.save(), RedisPub(
      "user_register_password_google_facebook",
      JSON.stringify({
        password,
        name,
        email,
      })
    )]).then(rs => {
      return newUser;
    }).catch(err => {
      return err;
    });
  },
};
