const path = require("path");
const { returnReasons } = require("../../middlewares/handleError");
const {
  checkLoginUser,
  checkLoginGoogle,
  checkLoginFacebook,
  checkRegisterUser,
  CreateNewAcceptToken,
  LogoutRemoveAllUser,
  HandleProfile,
  HandleForgerPasswordUser,
  HandleResetPasswordUser,
  HandleChangePassword,
  HandleUploadProfile,
} = require("../../user_api/services/user.service/user.service");
const {
  CheckVerificationUser,
} = require("../services/user.service/checkAuthUser.service");
const userCtrl = {
  //*--------------- Authentication Users ---------------

  //* Login Email and Phone
  loginUser: async (req, res) => {
    try {
      const { email_phone, password, token } = req.body;
      const GetIPUser =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      let session = req.session;
      const { status, success, element } = await checkLoginUser({
        email_phone,
        password,
        token,
        GetIPUser,
        res,
        session,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Login Google
  loginUserGoogle: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const { status, success, element } = await checkLoginGoogle({
        tokenId,
        res,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Login Facebook
  loginUserFacebook: async (req, res) => {
    try {
      const { userID, accessToken } = req.body;
      const { status, success, element } = await checkLoginFacebook({
        userID,
        accessToken,
        res,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Registers
  registerUser: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        sex,
        date_of_birth,
        phone_number,
        token,
      } = req.body;
      const { status, success, element } = await checkRegisterUser({
        name,
        email,
        password,
        confirmPassword,
        sex,
        date_of_birth,
        phone_number,
        token,
        req,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Verification Email
  verifyEmail: async (req, res) => {
    try {
      const { userId, uniqueString } = req.params;
      const { success } = await CheckVerificationUser(userId, uniqueString);
      if (!success) {
        return res.sendFile(path.resolve(__dirname, "../../views/error.html"));
      } else {
        return res.sendFile(
          path.resolve(__dirname, "../../views/thankyou.html")
        );
      }
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* New AcceptToken
  createNewAccessTokens: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { status, success, element } = await CreateNewAcceptToken({
        user_id,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Logout
  LogoutUser: async (req, res) => {
    try {
      const user_id = req.user.id;
      const token = req.token;
      const session = req.session;
      const { status, success, element } = await LogoutRemoveAllUser({
        user_id,
        token,
        session,
        res,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },

  //*--------------- Information Users ---------------

  //* Profile User
  ProfileUser: async (req, res) => {
    try {
      const user_id = req.user.id;
      const session = req.session;
      const { status, success, element } = await HandleProfile({
        user_id,
        session,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  // * Update Profile
  UpdateProfile: async (req, res) => {
    try {
      const { name, image, phone_number, sex, date_of_birth } = req.body;
      const user_id = req.user.id;
      const { status, success, element } = await HandleUploadProfile({
        name,
        image,
        phone_number,
        sex,
        date_of_birth,
        user_id,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },

  //*--------------- Forget,Reset,Change Users ---------------

  //* Forget Password User
  ForgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const { status, success, element } = await HandleForgerPasswordUser({
        email,
        req,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
        error,
      });
    }
  },
  //* Reset Password User
  ResetPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const token = req.params.token;
      const { status, success, element } = await HandleResetPasswordUser({
        password,
        confirmPassword,
        token,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Change Password User
  ChangePassword: async (req, res) => {
    try {
      const { password, oldPassword, confirmPassword } = req.body;
      const user_id = req.user.id;
      const { status, success, element } = await HandleChangePassword({
        password,
        oldPassword,
        confirmPassword,
        user_id,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
};
module.exports = userCtrl;
