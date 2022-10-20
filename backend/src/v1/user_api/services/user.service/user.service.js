const { v4: uuidv4 } = require("uuid");
const {
  createAccessToken,
  createRefreshToken,
  randomString,
} = require("../../../utils/helper");
const {
  LoginEmail,
  LoginPhone,
  CheckEmail,
  RegisterSocial,
} = require("./userType.service");
const {
  CheckRegister,
  CheckForget,
  CheckResetPassword,
  CheckChangePassword,
  CheckUpdateProfile,
} = require("./checkAuthUser.service");
const { UserSpam } = require("./userSpam.service");
const {
  callDataGoogle,
  saveCookies,
  callDataFacebook,
  GenerateRefreshToken,
} = require("../../../utils/storage");
const {
  Verification,
} = require("../../services/user.service/newVerification.service");
const {
  createUser,
  NewAcceptToken,
  UpdatePassword,
  UpdateProfile,
} = require("./createEditDeleteUser.service");
const {
  getProfileId,
  getInfoEveryUser,
  getOrderInfoEveryUser,
} = require("./getalluser.service");
const { get, RedisPub, del } = require("../../../utils/limited_redis");
const PASSWORD = require("../../../utils/password");
const STORAGE = require("../../../utils/storage");
const CONSTANTS = require("../../../configs/constants");
const Users = require("../../../models/userModel");
module.exports = {
  //*--------------- Handle Authentication Users  ---------------
  checkLoginUser: async ({
    email_phone,
    password,
    token,
    GetIPUser,
    res,
    session,
  }) => {
    const { status, _ttl, msg } = UserSpam(GetIPUser);
    if (status === 400) {
      return {
        status,
        success: false,
        element: {
          _ttl,
          msg,
        },
      };
    }
    let result_user = null;
    if (email_phone.includes("@") == true) {
      result_user = await LoginEmail(email_phone, password);
    } else {
      result_user = await LoginPhone(email_phone);
    }
    if (!result_user || result_user.success === false) {
      return {
        status: result_user?.status,
        success: result_user?.success,
        element: result_user.element,
      };
    }
    session.users = {
      id: result_user._id,
      email: email_phone,
    };
    session.save();
    const accessToken = createAccessToken({ id: result_user._id });
    const refreshToken = await GenerateRefreshToken({ id: result_user._id });
    saveCookies(res, refreshToken);
    return {
      status: 200,
      success: true,
      element: {
        accessToken,
        refreshToken,
      },
    };
  },
  handleLoginPhoneFirebase: async ({ phone_number, session, res }) => {
    const user_phone = await STORAGE.checkPhoneExitFirebase(phone_number);
    if (!user_phone) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Phone Numbers Not Exit !!!",
        },
      };
    }
    session.users = {
      id: user_phone._id,
      email: user_phone.email,
    };
    session.save();
    const accessToken = createAccessToken({ id: user_phone._id });
    const refreshToken = await GenerateRefreshToken({ id: user_phone._id });
    saveCookies(res, refreshToken);
    return {
      status: 200,
      success: true,
      element: {
        accessToken,
        refreshToken,
      },
    };
  },
  checkLoginGoogle: async ({ tokenId, res }) => {
    const user_google = await callDataGoogle(tokenId);
    const { name, email, picture } = user_google.payload;
    let result_user = await CheckEmail(email);
    if (result_user) {
      const accessToken = createAccessToken({ id: result_user._id });
      const refreshToken = await GenerateRefreshToken({ id: result_user._id });
      saveCookies(res, refreshToken);
      return {
        status: 200,
        success: true,
        element: {
          accessToken,
          refreshToken,
        },
      };
    } else {
      var password = randomString(10);
      let newUser = await RegisterSocial({
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
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      saveCookies(res, refreshToken);
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
  checkLoginFacebook: async ({ userID, accessToken, res }) => {
    let response = await callDataFacebook(userID, accessToken);
    const { email, name, picture } = response;
    let result_user = await CheckEmail(email);
    if (result_user) {
      const accessToken = createAccessToken({ id: result_user._id });
      // const refreshToken = createRefreshToken({ id: result_user._id });
      const refreshToken = await GenerateRefreshToken({ id: result_user._id });

      saveCookies(res, refreshToken);
      return {
        status: 200,
        success: true,
        element: {
          accessToken,
          refreshToken,
        },
      };
    } else {
      var password = randomString(10);
      let newUser = await RegisterSocial({
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
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      saveCookies(res, refreshToken);
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
  checkRegisterUser: async ({
    name,
    email,
    password,
    confirmPassword,
    sex,
    date_of_birth,
    phone_number,
    token,
    req,
  }) => {
    const { status, success, element } = await CheckRegister({
      email,
      phone_number,
      password,
      confirmPassword,
      date_of_birth,
    });
    if (!success) {
      return {
        status,
        success,
        element,
      };
    }
    const password_user = await PASSWORD.encodePassword(password);
    let newUser = await createUser(
      name,
      email,
      password_user,
      sex,
      date_of_birth,
      phone_number
    );
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/`;

    const currentUrl = resetPasswordUrl;
    const uniqueString = uuidv4() + newUser.id;
    const hashedUniqueString = await PASSWORD.encodePassword(uniqueString);

    await Verification({ newUser, hashedUniqueString });
    const confirmEmailUrl =
      currentUrl + "api/user/verify/" + newUser.id + "/" + uniqueString;
    await RedisPub(
      "user_register",
      JSON.stringify({
        confirmEmailUrl,
        email,
      })
    );
    return {
      status: 200,
      success: true,
      element: {
        msg: `Verification email sent to ${email} `,
      },
    };
  },
  CreateNewAcceptToken: async ({ user_id }) => {
    const newAccessTokens = NewAcceptToken({ user_id });
    return {
      status: 200,
      success: true,
      element: {
        accessToken: newAccessTokens,
      },
    };
  },
  LogoutRemoveAllUser: async ({ user_id, token, session, res }) => {
    await del(user_id);
    res.clearCookie("refreshtoken", {
      path: "/api/user/new/accessToken",
    });
    session.destroy();
    return {
      status: 200,
      success: true,
      element: { msg: "Logged out success" },
    };
  },
  HandleForgerPasswordUser: async ({ email, req }) => {
    const { status, success, element } = await CheckForget({
      email,
    });
    if (!success) {
      return {
        status,
        success,
        element,
      };
    }
    let user = element;
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: CONSTANTS.DELETED_DISABLE });
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/user/password/reset/${resetToken}`;
    await RedisPub(
      "user_forget_password",
      JSON.stringify({
        resetPasswordUrl,
        email,
      })
    );
    return {
      status: 200,
      success: true,
      element: {
        msg: `Email sent to ${user.email} successfully`,
      },
    };
  },
  HandleResetPasswordUser: async ({ password, confirmPassword, token }) => {
    const { status, success, element } = await CheckResetPassword({
      password,
      confirmPassword,
      token,
    });
    if (!success) {
      return {
        status,
        success,
        element,
      };
    }
    let user = element;
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    const salt = await PASSWORD.genSalt();
    const passwordHash = await PASSWORD.encodeResetPassword(
      user.password,
      salt
    );
    await UpdatePassword(user.id, passwordHash);
    return {
      status: 200,
      success: true,
      element: {
        msg: "Reset successfully",
      },
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
    const salt = await PASSWORD.genSalt();
    const passwordHash = await PASSWORD.encodeResetPassword(password, salt);
    await UpdatePassword({
      user_id: user_id,
      password: passwordHash,
    });
    return {
      status: 200,
      success: true,
      element: {
        msg: "Change Password Successfully 😂!",
      },
    };
  },
  //*--------------- Handle Information Users  ---------------
  HandleProfile: async ({ user_id, session }) => {
    let profile_user_id = await get(`userId:${user_id}`);
    if (profile_user_id) {
      return {
        status: 200,
        success: true,
        element: JSON.parse(profile_user_id),
      };
    }
    if (session?.users?.id) {
      const user = await getProfileId(session);
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
  HandleUploadProfile: async ({
    name,
    image,
    phone_number,
    sex,
    date_of_birth,
    user_id,
  }) => {
    const { status, success, element } = await CheckUpdateProfile({
      name,
      image,
      phone_number,
      sex,
      date_of_birth,
      user_id,
    });
    if (!success) {
      return {
        status,
        success,
        element,
      };
    }
    await UpdateProfile({
      name,
      image,
      phone_number,
      sex,
      date_of_birth,
      user_id,
    });
    return {
      status: 200,
      success: true,
      element: {
        msg: "Updated Profile Successfully !",
      },
    };
  },
  HandleInfoEveryUsers: async ({ user_id }) => {
    if (!user_id) {
      return {
        status: 401,
        success: false,
        element: {
          msg: "Get Info User Fail !",
        },
      };
    }
    const user = await getInfoEveryUser(user_id);
    const order_user = await getOrderInfoEveryUser(user_id);
    return {
      status: 200,
      success: true,
      element: {
        info: user,
        order_user: order_user,
      },
    };
  },
};
