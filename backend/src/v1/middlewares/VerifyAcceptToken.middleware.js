const HELPER = require("../utils/helper");
const REDIS = require("../db/redis_db")
const CONSTANTS = require("../configs/constants")
const VerifyAcceptToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let now = new Date();

    if (token) {
      const decoded = HELPER.VerifyAccToken(token);
      let auth_user = HELPER.decodeJWT(token)

      if (decoded.exp < now.getTime() / 1000) {
        return res.status(401).json({
          status: 401,
          success: false,
          element: {
            msg: "Expired Token",
          },
        });
      }

      REDIS.lrange(CONSTANTS.REDIS_BLACK_LIST + ":" + auth_user.user_id || auth_user.id, CONSTANTS.REDIS_MIN_LIST, CONSTANTS.REDIS_MAX_LIST).then(result => {
        if (result.indexOf(token) > -1) {
          return res.status(401).json({
            status: 401,
            success: false,
            element: {
              message: "Invalid Token",
            },
          });
        } else {
          req.user = decoded;
          req.token = token;
          next();
        }
      })
    }
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
