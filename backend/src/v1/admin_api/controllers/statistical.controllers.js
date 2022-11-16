const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetSumInCome,
  handleGetUserBuy3days,
  handleMonthlyIncomeCustomerReceived,
  handleIncomeCustomerReceivedThisAndLastMonth,
  handleIncomeCustomerNotReceivedThisAndLastMonth,
} = require("../services/tatistical_admin/statistical.service");
module.exports = {
  //* Statistical Sum total
  StatisticalSumTotal: async (req, res) => {
    try {
      const { status, success, element } = await handleGetSumInCome();
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
  //* List account buy new 3 days.
  ListUserBuyNew3days: async (req, res) => {
    try {
      const { status, success, element } = await handleGetUserBuy3days();
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
  //* Get monthly the income customer have received (12 month)
  getMonthlyIncomeCustomerReceived: async (req, res) => {
    try {
      const { status, success, element } =
        await handleMonthlyIncomeCustomerReceived();
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
  //*Get the income customer received this month and compare to last month
  getIncomeCustomerReceivedThisAndLastMonth: async (req, res) => {
    try {
      const { status, success, element } =
        await handleIncomeCustomerReceivedThisAndLastMonth();
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
  getIncomeCustomerNotReceivedThisAndLastMonth: async (req, res) => {
    try {
      const { status, success, element } =
        await handleIncomeCustomerNotReceivedThisAndLastMonth();
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
