const path = require("path");
const { returnReasons } = require("../../middlewares/handleError");
const {
  checkLoginUser,
  checkLoginGoogle,
  checkLoginFacebook,
  checkRegisterUser,
  CreateNewAcceptToken,
  LogoutRemoveAllUser,
} = require("../../user_api/services/user.service/user.service");
const {
  CheckVerificationUser,
} = require("../services/user.service/checkAuthUser.service");
const userCtrl = {
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
};
module.exports = userCtrl;
