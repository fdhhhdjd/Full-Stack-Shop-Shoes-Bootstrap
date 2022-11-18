const OtpGenerator = require("otp-generator");
const {
  LoginPhoneAdmin,
  LoginEmailAdmin,
  CheckForgetAdmin,
  CheckChangePassword,
} = require("./auth.type.admin");
const { insertOtp, validOtp } = require("./otp.service");
const { _Otp } = require("../../../models/Otp.model");
const { UpdatePassword, createAdminSocial } = require("./Crud.admin.service");
const {
  getProfileId,
} = require("../../../user_api/services/user.service/getalluser.service");
const { get, RedisPub, del } = require("../../../utils/limited_redis");
const STORAGE = require("../../../utils/storage");
const HELPER = require("../../../utils/helper");
const PASSWORD = require("../../../utils/password");
const Users = require("../../../models/userModel");
const CONSTANTS = require("../../../configs/constants");

module.exports = {
  handleLoginAdmin: async ({ email_phone, password, res, session }) => {
    let result_admin = null;
    if (email_phone.includes("@") == true) {
      result_admin = await LoginEmailAdmin(email_phone, password);
    } else {
      result_admin = await LoginPhoneAdmin(email_phone);
    }
    if (!result_admin || result_admin.success === false) {
      return {
        status: result_admin?.status,
        success: result_admin?.success,
        element: result_admin.element,
      };
    }
    session.users = {
      id: result_admin._id,
      email: email_phone,
    };
    session.save();
    const accessToken = HELPER.createAccessToken({ id: result_admin._id });
    const refreshToken = await STORAGE.GenerateRefreshToken({
      id: result_admin._id,
    });
    STORAGE.saveCookiesAdmin(res, refreshToken);
    return {
      status: 200,
      success: true,
      element: {
        accessToken,
        refreshToken,
      },
    };
  },
  handleRegisterAdmin: async ({ email }) => {
    const checkEmailExit = await STORAGE.checkUserExit(email);
    if (checkEmailExit) {
      return {
        status: 307,
        success: false,
      };
    }
    const OTP = OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await RedisPub(
      "admin_register_send_otp",
      JSON.stringify({
        OTP,
        email,
      })
    );

    return {
      status: 200,
      success: true,
      element: await insertOtp({
        otp: OTP,
        email,
      }),
    };
  },
  handleVerifyOtp: async ({ email, otp }) => {
    const otpHolder = await _Otp.find({
      email,
    });
    if (!otpHolder.length) {
      return {
        status: 404,
        success: false,
        element: {
          msg: "Expired OTP !!!",
        },
      };
    }

    const lastOtp = otpHolder[otpHolder.length - 1];
    const isValid = await validOtp({
      otp,
      hashOtp: lastOtp.otp,
    });
    if (!isValid) {
      return {
        status: 401,
        success: false,
        element: {
          msg: "Invalid OTP!!!",
        },
      };
    }

    if (isValid && email === lastOtp.email) {
      let password = HELPER.randomString(10);
      const password_random = await PASSWORD.encodePassword(password);
      const user = await Users.create({
        name: "",
        password: password_random,
        email,
        role: 1,
        verified: CONSTANTS.DELETED_ENABLE,
        checkLogin: CONSTANTS.DELETED_ENABLE,
      });
      await RedisPub(
        "admin_register_otp_new_password",
        JSON.stringify({
          password,
          email,
        })
      );
      if (user) {
        await _Otp.deleteMany({
          email,
        });
      }
    }
    return {
      status: 200,
      success: true,
      element: {
        msg: `Password Create send to your ${email}`,
      },
    };
  },
  handleForgotAdmin: async ({ email }) => {
    const { status, success, element } = await CheckForgetAdmin({ email });
    if (!success) {
      return { status, success, element };
    }
    let password = HELPER.randomString(10);
    const password_random = await PASSWORD.encodePassword(password);
    await UpdatePassword(element._id, password_random);
    await RedisPub(
      "admin_forget_password",
      JSON.stringify({
        password,
        email,
      })
    );
    return {
      status: 200,
      success: true,
      element: {
        msg: `Password reset send to your ${email}`,
      },
    };
  },
  handleProfileAdmin: async ({ user_id, session }) => {
    let profile_user_id = await get(`userId:${user_id}`);
    if (profile_user_id) {
      return {
        status: 200,
        success: true,
        element: JSON.parse(profile_user_id),
      };
    }
    if (session?.users?.id) {
      const user = await getProfileId(session?.users?.id);
      return {
        status: 200,
        success: true,
        element: user,
      };
    }

    const user = await getProfileId(user_id);
    return {
      status: 200,
      success: true,
      element: user,
    };
  },
  handleLoginGoogleAdmin: async ({ tokenId, res }) => {
    const user_google = await STORAGE.callDataGoogle(tokenId);
    const { name, email, picture } = user_google.payload;
    let result_user = await STORAGE.checkAdminExit(email);
    if (result_user) {
      const accessToken = HELPER.createAccessToken({ id: result_user._id });
      const refreshToken = await STORAGE.GenerateRefreshToken({
        id: result_user._id,
      });
      STORAGE.saveCookies(res, refreshToken);
      return {
        status: 200,
        success: true,
        element: {
          accessToken,
          refreshToken,
        },
      };
    } else {
      var password = HELPER.randomString(10);
      let newUser = await createAdminSocial({
        name,
        email,
        picture,
        password,
      });
      if (!newUser) {
        return {
          status: 503,
          success: false,
        };
      }
      const accessToken = HELPER.createAccessToken({ id: newUser._id });
      const refreshToken = HELPER.createRefreshToken({ id: newUser._id });
      STORAGE.saveCookies(res, refreshToken);
      return {
        status: 200,
        success: true,
        element: {
          accessToken,
          refreshToken,
        },
      };
    }
  },
  handleLogoutAdmin: async ({ user_id, token, session, res }) => {
    await del(`cartUserId:${user_id}`);
    res.clearCookie("refreshtoken", {
      path: "/api/auth/refresh_token",
    });
    session.destroy();
    return {
      status: 200,
      success: true,
      element: { msg: "Logged out success" },
    };
  },
  HandleChangePassword: async ({
    password,
    oldPassword,
    confirmPassword,
    user_id,
  }) => {
    const { status, success, element } = await CheckChangePassword({
      password,
      oldPassword,
      confirmPassword,
      user_id,
    });

    if (!success) {
      return {
        status,
        success,
        element,
      };
    }
    let user = element;
    const salt = await PASSWORD.genSalt();
    const passwordHash = await PASSWORD.encodeResetPassword(password, salt);
    await UpdatePassword(user.id, passwordHash);
    return {
      status: 200,
      success: true,
      element: {
        msg: "Change Password Successfully 😂!",
      },
    };
  },
};
