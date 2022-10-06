const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetAllUsers,
  handleGetAllAdmin,
  handleUploadAccount,
  handleDeleteAccount,
  handleListUserNews,
  handleListUserDeleteOrders,
  handleListUsersMonthlyRegistered,
} = require("../services/manager_users/manager_user.service");
const manger_userCtrl = {
  //* Get All manger_user
  getAllUsers: async (req, res) => {
    try {
      const { status, success, element } = await handleGetAllUsers();
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
  //* get All Admin
  getAllAdmin: async (req, res) => {
    try {
      const { status, success, element } = await handleGetAllAdmin();
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
  //* Upload account users and admin
  uploadAccountUserAndAdmin: async (req, res) => {
    try {
      const { name, image, phone_number, role, sex, date_of_birth } = req.body;
      const user_id = req.params.id;
      const { status, success, element } = await handleUploadAccount({
        name,
        image,
        phone_number,
        role,
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
  //* Delete account users and admin
  deleteAccountUserAndAdmin: async (req, res) => {
    try {
      const user_id = req.params.id;
      const { status, success, element } = await handleDeleteAccount({
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
  //* List account register new 3 days.
  ListAccountUserNew: async (req, res) => {
    try {
      const { status, success, element } = await handleListUserNews();
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
  //* List account Users delete orders
  ListAccountUserDeleteOrder: async (req, res) => {
    try {
      const { status, success, element } = await handleListUserDeleteOrders();
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
  //* Lis users monthly registered customers
  ListMonthlyRegisteredCustomers: async (req, res) => {
    try {
      const { status, success, element } =
        await handleListUsersMonthlyRegistered();
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
module.exports = manger_userCtrl;
