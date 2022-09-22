"use strict";
const { v4: uuidv4 } = require("uuid");

const { comparePassword } = require("../../utils/password");
const { checkUserExit, checkPhoneExit } = require("../../utils/storage");
const sendEmail = require("../services/sendEmail.service");
const PASSWORD = require("../../utils/password");
const Users = require("../../models/userModel");
const CONFIGS = require("../../configs/config");
// const HELPER = require("../../utils/helper");

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
      const user_email = await checkUserExit(email_phone);
      if (!user_email)
        return {
          status: 305,
          success: false,
        };
      if (user_email.verified === false) {
        return {
          status: 400,
          success: false,
        };
      }
      const user_password = await PASSWORD.comparePassword(
        password,
        user_email?.password
      );
      console.log(user_password);
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
      // const check_phone = HELPER.isVietnamesePhoneNumber(email_phone);
      if (!check_phone) {
        return {
          status: 306,
          success: false,
        };
      }
      const user_phone = await checkPhoneExit(email_phone);
      return user_phone;
    } catch (error) {
      return {
        status: 503,
      };
    }
  },
  LoginGoogle: async (email_google) => {
    const user_email = await checkUserExit(email_google);
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
        public_id: uuidv4(),
        url: picture,
      },
      verified: true,
    });
    await newUser.save();
    await sendEmail({
      from: CONFIGS.SMTP_MAIL,
      to: email,
      subject: `Password For You`,
      template: "password-register",
      context: {
        password,
        name,
        email,
      },
    });
    return newUser;
  },
};
