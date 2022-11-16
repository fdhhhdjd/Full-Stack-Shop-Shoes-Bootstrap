const Users = require("../models/userModel");
const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        element: {
          msg: "Admin resources access denied",
        },
      });
    }
    next();
  } catch (err) {
    return res.status(503).json({
      status: 401,
      success: false,
      element: {
        msg: "Your session is not valid.",
      },
    });
  }
};

module.exports = authAdmin;
