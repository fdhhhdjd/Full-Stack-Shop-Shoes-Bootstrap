const {
  deleteVerificationAndUser,
  UpdateVerificationUser,
} = require("./createEditDeleteUser.service");

const STORAGE = require("../../../utils/storage");
const HELPER = require("../../../utils/helper");
const PASSWORD = require("../../../utils/password");
const { checkVerification } = require("../../../utils/storage");
const { getProfileId } = require("./getalluser.service");
module.exports = {
  CheckRegister: async ({
    email,
    phone_number,
    password,
    confirmPassword,
    date_of_birth,
  }) => {
    const checkEmail = HELPER.validateEmail(email);
    if (!checkEmail) {
      return {
        status: 307,
        success: false,
        element: {
          msg: "Invalid Email",
        },
      };
    }
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
    if (user_phone_exits.length > 0) {
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
        const isMatch = await PASSWORD.comparePassword(
          uniqueString,
          hashedUniqueString
        );
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
  CheckForget: async ({ email }) => {
    const checkEmail = HELPER.validateEmail(email);
    if (!checkEmail) {
      return {
        status: 307,
        success: false,
        element: {
          msg: "Invalid Email",
        },
      };
    }
    const user_email_exits = await STORAGE.checkUserExit(email);
    if (!user_email_exits) {
      return {
        status: 307,
        success: false,
      };
    }
    return {
      success: true,
      element: user_email_exits,
    };
  },
  CheckResetPassword: async ({ password, confirmPassword, token }) => {
    const resetPasswordToken = HELPER.resetPasswordToken(token);
    const user = await STORAGE.CheckUserExpired(resetPasswordToken);
    if (!user) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Reset Password Token is invalid or has been expired",
        },
      };
    }
    if (!password && !confirmPassword) {
      return {
        status: 403,
        success: false,
        element: {
          msg: "Password or confirmPassword are not empty.",
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
    if (confirmPassword !== password) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Password and confirm password does not match!",
        },
      };
    }
    return {
      success: true,
      element: user,
    };
  },
  CheckChangePassword: async ({
    password,
    oldPassword,
    confirmPassword,
    user_id,
  }) => {
    const user = await getProfileId(user_id);
    if (!password)
      return {
        status: 400,
        success: false,
        element: {
          msg: "Password are not empty.",
        },
      };

    if (!confirmPassword)
      return {
        status: 400,
        success: false,
        element: {
          msg: " Confirm are not empty.",
        },
      };

    if (!oldPassword)
      return {
        status: 400,
        success: false,
        element: {
          msg: "Old Password are not empty.",
        },
      };

    if (password.length < 6)
      return {
        status: 400,
        success: false,
        element: {
          msg: "Password is at least 6 characters long.",
        },
      };

    const reg = HELPER.isPassword(password);
    if (!reg) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Includes 6 characters, uppercase, lowercase and some and special characters.",
        },
      };
    }
    if (confirmPassword !== password) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Password and confirm password does not match!",
        },
      };
    }

    const isMatch = await PASSWORD.comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return {
        status: 400,
        success: false,
        element: {
          msg: " Old Password Incorrect",
        },
      };
    }
    return {
      success: true,
      element: user,
    };
  },
  CheckUpdateProfile: async ({
    name,
    image,
    phone_number,
    sex,
    date_of_birth,
    user_id,
  }) => {
    if ((!name, !image, !phone_number, !sex, !date_of_birth)) {
      return {
        status: 308,
        success: false,
        element: {
          msg: "Invalid Empty",
        },
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
    const checkPhoneUserExit = await STORAGE.checkPhoneExitExceptUserMain(
      user_id,
      phone_number
    );
    if (checkPhoneUserExit.length > 0) {
      return {
        status: 306,
        success: false,
        element: {
          msg: "Phone Exited",
        },
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
    return {
      success: true,
    };
  },
};
