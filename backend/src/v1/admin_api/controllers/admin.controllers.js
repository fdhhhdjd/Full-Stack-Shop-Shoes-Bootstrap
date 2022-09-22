const adminCtrl = {
  loginAdmin: async (req, res) => {
    res.status(200).json({
      msg: "admin",
    });
  },
};
module.exports = adminCtrl;
