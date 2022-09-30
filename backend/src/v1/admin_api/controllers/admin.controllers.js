const { returnReasons } = require("../../middlewares/handleError");
const {
  CreateNewAcceptToken,
  HandleUploadProfile,
} = require("../../user_api/services/user.service/user.service");
const {
  handleLoginAdmin,
  handleRegisterAdmin,
  handleVerifyOtp,
  handleForgotAdmin,
  handleProfileAdmin,
  handleLoginGoogleAdmin,
  handleLogoutAdmin,
} = require("../services/auth_admin/auth_admin_service");

const adminCtrl = {
  loginAdmin: async (req, res) => {
    try {
      const { email_phone, password } = req.body;
      let session = req.session;
      const { status, success, element } = await handleLoginAdmin({
        email_phone,
        password,
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
  //* Registers
  registerAdmin: async (req, res) => {
    try {
      const { email } = req.body;
      const { status, success, element } = await handleRegisterAdmin({
        email,
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
  //* Verification
  verifyOtpAdmin: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const { status, success, element } = await handleVerifyOtp({
        email,
        otp,
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
  //* New Access Token
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
  //*Forget
  forgetAdmin: async (req, res) => {
    try {
      const { email } = req.body;
      const { status, success, element } = await handleForgotAdmin({
        email,
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
  //* Profile
  ProfileAdmin: async (req, res) => {
    try {
      const user_id = req.user.id;

      const session = req.session;

      const { status, success, element } = await handleProfileAdmin({
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
  //* Login Google
  loginAdminGoogle: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const { status, success, element } = await handleLoginGoogleAdmin({
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
  //* Logout Admin
  logoutAdmin: async (req, res) => {
    try {
      const user_id = req.user.id;
      const token = req.token;
      const session = req.session;
      const { status, success, element } = await handleLogoutAdmin({
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
  //*Update profile Admin
  UpdateProfileAdmin: async (req, res) => {
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
};
module.exports = adminCtrl;
