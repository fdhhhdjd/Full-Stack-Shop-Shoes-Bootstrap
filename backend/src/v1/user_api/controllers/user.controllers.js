const { returnReasons } = require("../../middlewares/handleError");
const {
  checkLoginUser,
  checkLoginGoogle,
} = require("../../user_api/services/user.service");

const userCtrl = {
  loginUser: async (req, res) => {
    try {
      const { email_phone, password, token } = req.body;
      const GetIPUser =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      // const { status, success, element } = await checkLoginUser({
      //   email_phone,
      //   password,
      //   token,
      //   GetIPUser,
      //   res,
      // });
      // return res.status(status).json({
      //   status,
      //   success,
      //   msg: returnReasons(status.toString()),
      //   element,
      // });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  // loginUserGoogle: async (req, res) => {
  //   try {
  //     const { tokenId } = req.body;
  //     const { status, success, element } = await checkLoginGoogle({
  //       tokenId,
  //       res,
  //     });
  //     return res.status(status).json({
  //       status,
  //       success,
  //       msg: returnReasons(status.toString()),
  //       element,
  //     });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: 503,
  //       success: false,
  //       element: returnReasons("503"),
  //     });
  //   }
  // },
};
module.exports = userCtrl;
