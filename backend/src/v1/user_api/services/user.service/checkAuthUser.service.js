const {
  deleteVerificationAndUser,
  UpdateVerificationUser,
} = require("./createEditDeleteUser.service");
const STORAGE = require("../../../utils/storage");
const HELPER = require("../../../utils/helper");
const { checkVerification } = require("../../../utils/storage");
const { comparePassword } = require("../../../utils/password");
module.exports = {
  CheckRegister: async ({
    email,
    phone_number,
    password,
    confirmPassword,
    date_of_birth,
  }) => {
    const user_email_exits = await STORAGE.checkUserExit(email);

    if (user_email_exits) {
      return {
        status: 307,
        success: false,
      };
    }
    if (isNaN(phone_number)) {
      return {
        status: 306,
        success: false,
        element: {
          msg: "Phone is must be number.",
        },
      };
    }
    const check_phone_vietnamese = HELPER.isVietnamesePhoneNumber(phone_number);
    if (!check_phone_vietnamese) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Incorrect phone number.",
        },
      };
    }
    const user_phone_exits = await STORAGE.checkPhoneExit(phone_number);
    if (user_phone_exits) {
      return {
        status: 306,
        success: false,
      };
    }

    const check_date = HELPER.validateDate(date_of_birth);
    if (!date_of_birth) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Please Choose A Date.",
        },
      };
    } else if (!check_date) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Incorrect Date .",
        },
      };
    }
    if (password !== confirmPassword) {
      return {
        status: 403,
        success: false,
        element: {
          msg: "Password and confirm password does not match!",
        },
      };
    }
    if (password.length < 6) {
      return {
        status: 401,
        success: false,
        element: {
          msg: "Password is at least 6 characters long. ",
        },
      };
    }

    const user_password = HELPER.isPassword(password);
    if (!user_password) {
      return {
        status: 401,
        success: false,
        element: {
          msg: "Password not safe. ",
        },
      };
    }
    return {
      success: true,
    };
  },
  CheckVerificationUser: async (userId, uniqueString) => {
    const check_user = await checkVerification(userId);
    if (check_user) {
      const expiredAt = check_user.expiresAt;
      const hashedUniqueString = check_user.uniqueString;
      if (expiredAt < Date.now()) {
        await deleteVerificationAndUser(userId);
        return {
          success: false,
        };
      } else {
        const isMatch = await comparePassword(uniqueString, hashedUniqueString);
        if (isMatch) {
          await UpdateVerificationUser(userId);
          return {
            success: true,
          };
        } else {
          return {
            status: 400,
            success: false,
            element: {
              msg: "Link invalid, unique string is not match",
            },
          };
        }
      }
    } else {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Link is invalid because userid incorrect",
        },
      };
    }
  },
};
