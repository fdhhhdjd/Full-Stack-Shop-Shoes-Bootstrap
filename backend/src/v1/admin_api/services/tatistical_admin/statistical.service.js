const Payments = require("../../../models/PaymentModel");
const CONSTANTS = require("../../../configs/constants");
module.exports = {
  handleGetSumInCome: async () => {
    try {
      const data = await Payments.aggregate([
        {
          $group: {
            _id: "sum_of_income",
            total: { $sum: "$total" },
          },
        },
      ]);

      return {
        status: 200,
        success: true,
        element: {
          msg: "Get sum of income successfully",
          data,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Get sum of income fail",
        },
      };
    }
  },
  handleGetUserBuy3days: async () => {
    try {
      let payments = await Payments.find({
        deleteAt: CONSTANTS.DELETED_DISABLE,
      })
        .populate("user_id")
        .sort({ createdAt: -1 });
      var today = new Date();
      var result = [];
      for (var i = 0; i < payments.length; i++) {
        var time = GetDayNewUserBuy(payments[i].createdAt, today);
        if (time <= 3) {
          result.push(payments[i]);
        }
      }
      if (result.length === 0) {
        return {
          status: 200,
          success: true,
          element: {
            msg: "No Account New  !!",
            result,
          },
        };
      } else {
        return {
          status: 200,
          success: true,
          element: {
            total: result.length,
            msg: "Get New User Buy Successfully !!",
            result,
          },
        };
      }
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Get sum of income fail",
        },
      };
    }
  },
  handleMonthlyIncomeCustomerReceived: async () => {
    const monthly = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const year_now = new Date().getFullYear();

    try {
      let statistics = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            year: { $year: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: monthly },
            year: year_now,
            order_status: "Delivered",
          },
        },
        {
          $group: {
            _id: "$month",
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      for (let i = 0; i < statistics.length; i++) {
        if (monthly.includes(statistics[i]._id)) {
          var index = monthly.indexOf(statistics[i]._id);
          monthly.splice(index, 1);
        }
      }

      var missing_statistics = [];
      for (let i = 0; i < monthly.length; i++) {
        missing_statistics.push({
          _id: monthly[i],
          total_income: 0,
        });
      }
      var data = statistics.concat(missing_statistics);
      data.sort((a, b) => a._id - b._id);

      data.sort((a, b) => {
        return a._id - b._id;
      });

      return {
        status: 200,
        success: true,
        element: {
          msg: "Get monthly income successfully",
          data,
        },
      };
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Failed to get monthly income",
      });
    }
  },
  handleIncomeCustomerReceivedThisAndLastMonth: async () => {
    const thisMonth = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();

    try {
      let data = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: [lastMonth, thisMonth] },
            order_status: "Delivered",
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
            },
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
      ]);

      if (data.length === 0) {
        return {
          status: 400,
          success: false,
          msg: "Not data to show",
        };
      } else if (data.length === 1) {
        if (data[0]._id.month === thisMonth) {
          data = [
            {
              _id: {
                month: "This month",
              },
              total_income: data[0].total_income,
            },
            {
              _id: {
                month: "Last month",
              },
              total_income: 0,
            },
            {
              compared: "Increased",
              value: data[0].total_income * 100,
            },
          ];

          return {
            status: 200,
            success: true,
            element: {
              msg: "Get income of orders customer have received this and last month successfully",
              data,
            },
          };
        } else if (data[0]._id.month === lastMonth) {
          data = [
            {
              _id: {
                month: "This month",
              },
              total_income: 0,
            },
            {
              _id: {
                month: "Last month",
              },
              total_income: data[0].total_income,
            },
            {
              compared: "Decreased",
              value: -100,
            },
          ];
          return {
            status: 200,
            success: true,
            element: {
              msg: "Get income of orders customer have received this and last month successfully",
              data,
            },
          };
        }
      } else if (data.length === 2) {
        (data[0]._id.month = "This month"), (data[1]._id.month = "Last month");

        const value = (
          ((data[0].total_income - data[1].total_income) /
            data[1].total_income) *
          100
        ).toFixed(1);

        const compared = value >= 0 ? "Increased" : "Decreased";

        const compareToLastMonth = {
          compared,
          value,
        };

        data.push(compareToLastMonth);

        return {
          status: 200,
          success: true,
          element: {
            msg: "Get income of orders customer have received this and last month successfully",
            data,
          },
        };
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Server busy!",
        },
      };
    }
  },
  handleIncomeCustomerNotReceivedThisAndLastMonth: async (req, res) => {
    const thisMonth = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();

    try {
      let data = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: [lastMonth, thisMonth] },
            order_status: { $in: ["Ordered", "On Delivery"] },
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
            },
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
      ]);

      if (data.length === 0) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Not data to show",
          },
        };
      } else if (data.length === 1) {
        if (data[0]._id.month === thisMonth) {
          data = [
            {
              _id: {
                month: "This month",
              },
              total_income: data[0].total_income,
            },
            {
              _id: {
                month: "Last month",
              },
              total_income: 0,
            },
            {
              compared: "Increased",
              value: data[0].total_income * 100,
            },
          ];

          return {
            status: 200,
            success: true,
            element: {
              msg: "Get income of orders customer have not received this and last month successfully",
              data,
            },
          };
        } else if (data[0]._id.month === lastMonth) {
          data = [
            {
              _id: {
                month: "This month",
              },
              total_income: 0,
            },
            {
              _id: {
                month: "Last month",
              },
              total_income: data[0].total_income,
            },
            {
              compared: "Decreased",
              value: -100,
            },
          ];
          return {
            status: 200,
            success: true,
            element: {
              msg: "Get income of orders customer have not received this and last month successfully",
              data,
            },
          };
        }
      } else if (data.length === 2) {
        (data[0]._id.month = "This month"), (data[1]._id.month = "Last month");

        const value = (
          ((data[0].total_income - data[1].total_income) /
            data[1].total_income) *
          100
        ).toFixed(1);

        const compared = value >= 0 ? "Increased" : "Decreased";

        const compareToLastMonth = {
          compared,
          value,
        };

        data.push(compareToLastMonth);

        return res.status(200).json({
          status: 200,
          success: true,
          element: {
            msg: "Get income of orders customer have not received this and last month successfully",
            data,
          },
        });
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Server busy!",
        },
      };
    }
  },
};
const GetDayNewUserBuy = (d1, d2) => {
  let value1 = d1.getTime();
  let value2 = d2.getTime();
  return Math.ceil((value2 - value1) / CONSTANTS._1_DAY);
};
