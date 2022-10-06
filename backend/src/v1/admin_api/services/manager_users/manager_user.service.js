const {
  getAllUser,
  getAllAdmin,
  uploadAccount,
  deleteAccount,
  GetDayNewUser,
  getAllUserDelete,
  getAllUserSort,
} = require("./curd_manager.service");
const {
  CheckUpdateProfile,
} = require("../../../user_api/services/user.service/checkAuthUser.service");
const Products = require("../../../models/ProductModel");
const Payments = require("../../../models/PaymentModel");
module.exports = {
  handleGetAllUsers: async () => {
    try {
      const user = await getAllUser();
      return {
        status: 200,
        success: true,
        element: {
          user,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleGetAllAdmin: async () => {
    try {
      const admin = await getAllAdmin();
      return {
        status: 200,
        success: true,
        element: {
          admin,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleUploadAccount: async ({
    name,
    image,
    phone_number,
    role,
    sex,
    date_of_birth,
    user_id,
  }) => {
    try {
      if (!image)
        return {
          status: 400,
          success: false,
          element: {
            msg: "No image upload",
          },
        };
      const { status, success, element } = await CheckUpdateProfile({
        name,
        image,
        phone_number,
        sex,
        date_of_birth,
        user_id,
      });
      if (!success) {
        return {
          status,
          success,
          element,
        };
      }
      await uploadAccount(
        name,
        image,
        phone_number,
        role,
        sex,
        date_of_birth,
        user_id
      );

      return {
        status: 200,
        success: true,
        element: {
          msg: "Updated Successfully !",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleDeleteAccount: async ({ user_id }) => {
    try {
      await deleteAccount(user_id);
      const products = await Products.find({});
      for (var i = 0; i < products.length; i++) {
        for (var j = 0; j < products[i].reviews.length; j++) {
          if (products[i].reviews[j].user.toString() === user_id) {
            const a = products[i].reviews.slice(0, j);
            const b = products[i].reviews.slice(
              j + 1,
              products[i].reviews.length
            );
            const c = a.concat(b);
            products[i].reviews = c;
          }
        }
        products[i].numReviews = products[i].reviews.length;

        if (products[i].reviews.length === 0) {
          products[i].rating = 0;
        } else {
          products[i].rating =
            products[i].reviews.reduce((acc, item) => item.rating + acc, 0) /
            products[i].reviews.length;
        }
        await products[i].save();
      }

      await Payments.deleteMany({
        user_id: user_id,
      });
      return {
        status: 200,
        success: true,
        element: {
          msg: "Deleted a Successfully !",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleListUserNews: async () => {
    try {
      let user = await getAllUser();
      var today = new Date();
      var result = [];
      for (var i = 0; i < user.length; i++) {
        var time = GetDayNewUser(user[i].createdAt, today);
        if (time <= 3) {
          result.push(user[i]);
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
            msg: "Get New User Successfully !!",
            result,
          },
        };
      }
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleListUserDeleteOrders: async () => {
    try {
      const usersUncheck = await getAllUserDelete();
      return {
        status: 200,
        success: true,
        element: {
          user: usersUncheck,
        },
      };
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  handleListUsersMonthlyRegistered: async () => {
    try {
      const monthly = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const year_now = new Date().getFullYear();
      let statistics = await getAllUserSort(year_now, monthly);
      console.log(":::run");

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
          count: 0,
        });
      }

      var data = statistics.concat(missing_statistics);

      data.sort((a, b) => {
        return a._id - b._id;
      });

      return {
        status: 200,
        success: true,
        element: {
          msg: "Get monthly registered customers successfully",
          data,
        },
      };
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        element: {
          msg: "Failed to get monthly registered customers",
        },
      });
    }
  },
};
