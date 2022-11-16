const HELPER = require("../utils/helper");
const VerifyAcceptToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let now = new Date();
    const decoded = HELPER.VerifyAccToken(token);
    if (decoded.exp < now.getTime() / 1000) {
      return res.status(401).json({
        status: 401,
        success: false,
        element: {
          msg: "Expired Token",
        },
      });
    }
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      success: false,
      element: {
        message: "Your session is not valid.",
      },
    });
  }
};
module.exports = VerifyAcceptToken;
