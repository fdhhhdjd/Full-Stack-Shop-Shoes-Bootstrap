"use strict";
const { v4: uuidv4 } = require("uuid");
const STORAGE = require("../../../utils/storage");
const PASSWORD = require("../../../utils/password");
const Users = require("../../../models/userModel");
const CONFIGS = require("../../../configs/config");
const HELPER = require("../../../utils/helper.js");

module.exports = {
  LoginEmailAdmin: async (email_phone, password) => {
    try {
      const admin_email = await STORAGE.checkAdminExit(email_phone);
      if (!admin_email)
        return {
          status: 305,
          success: false,
        };
      if (admin_email.verified === false) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Email hasn't been verified. Please check email inbox",
          },
        };
      }
      const admin_password = await PASSWORD.comparePassword(
        password,
        admin_email?.password
      );
      if (!admin_password) {
        return {
          status: 403,
          success: false,
        };
      }
      return admin_email;
    } catch (error) {
      return {
        status: 503,
      };
    }
  },
  LoginPhoneAdmin: async (email_phone) => {
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
  CheckEmailAdmin: async (email) => {
    const user_email = await STORAGE.checkUserExit(email);
    return user_email;
  },
  //* Register Login
  RegisterSocialAdmin: async ({ name, email, picture, password }) => {
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
  //* Check Forget

  CheckForgetAdmin: async ({ email }) => {
    const account_admin = await STORAGE.checkAdminExit(email);
    const checkEmail = await HELPER.validateEmail(email);
    if (!email) {
      return {
        status: 308,
        success: false,
        element: {
          msg: "Please enter Email",
        },
      };
    } else if (!checkEmail) {
      return {
        status: 305,
        success: false,
        element: {
          msg: "Email Fail",
        },
      };
    }

    if (!account_admin) {
      return {
        status: 305,
        success: false,
        element: {
          msg: "Account not exit ",
        },
      };
    }
    return { success: true, element: account_admin };
  },
};
