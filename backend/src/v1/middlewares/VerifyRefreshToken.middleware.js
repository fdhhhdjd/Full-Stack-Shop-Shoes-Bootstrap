const HELPER = require("../utils/helper");
const { get } = require("../utils/limited_redis");
const VerifyRefreshToken = async (req, res, next) => {
  const token = req.cookies.refreshtoken;
  if (!token) {
    return res.status(401).json({ status: false, message: "Invalid request." });
  }
  try {
    var decoded = HELPER.VerifyRefreshToken(token);
    req.user = decoded;
    const refetch_user = await get(decoded.id);
    if (refetch_user === null) {
      return res.status(401).json({
        status: false,
        message: "Invalid request. Token is not in store.",
      });
    }
    if (refetch_user != token) {
      return res.status(401).json({
        status: 401,
        message: "Invalid request. Token is not same in store.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Your session is not valid.",
      error,
    });
  }
};

module.exports = VerifyRefreshToken;
