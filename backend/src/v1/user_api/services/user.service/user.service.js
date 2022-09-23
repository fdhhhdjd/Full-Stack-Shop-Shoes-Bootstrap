const { v4: uuidv4 } = require("uuid");
const path = require("path");
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
const { CheckRegister } = require("./checkAuthUser.service");
const { UserSpam } = require("./userSpam.service");
const {
  callDataGoogle,
  saveCookies,
  callDataFacebook,
} = require("../../../utils/storage");
const {
  Verification,
} = require("../../services/user.service/newVerification.service");
const { createUser } = require("./createEditDeleteUser.service");
const sendEmail = require("./sendEmail.service");
const PASSWORD = require("../../../utils/password");
const CONFIGS = require("../../../configs/config");
module.exports = {
  checkLoginUser: async ({ email_phone, password, token, GetIPUser, res }) => {
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
    const accessToken = createAccessToken({ id: result_user._id });
    const refreshToken = createRefreshToken({ id: result_user._id });
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
      const refreshToken = createRefreshToken({ id: result_user._id });
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
      const refreshToken = createRefreshToken({ id: result_user._id });
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
    const resetPasswordUrl = `http://localhost:5000/`;

    const currentUrl = resetPasswordUrl;
    const uniqueString = uuidv4() + newUser.id;
    const hashedUniqueString = await PASSWORD.encodePassword(uniqueString);

    await Verification({ newUser, hashedUniqueString });
    const confirmEmailUrl =
      currentUrl + "api/user/verify/" + newUser.id + "/" + uniqueString;
    if (confirmEmailUrl) {
      await sendEmail({
        from: CONFIGS.SMTP_MAIL,
        to: email,
        subject: `Verify Your Email`,
        template: "confirm-email",
        attachments: [
          {
            filename: "netflix.png",
            path: path.resolve("./src/v1/views", "images", "netflix.jpg"),
            cid: "netflix_logo",
          },
        ],
        context: {
          confirmEmailUrl,
        },
      });
    }
    return {
      status: 200,
      success: true,
      element: {
        msg: `Verification email sent to ${email} `,
      },
    };
  },
};
