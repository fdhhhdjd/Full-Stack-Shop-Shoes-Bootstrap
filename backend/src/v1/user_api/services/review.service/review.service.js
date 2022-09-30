const Products = require("../../../models/ProductModel");
const Users = require("../../../models/userModel");
const {
  createReview,
  editReview,
  deleteReview,
} = require("./crud_review.service");
module.exports = {
  handleCreateReview: async ({ rating, comment, review_id, user_id }) => {
    const product = await Products.findById(review_id);
    if (product) {
      const alreadyReviewed = await product.reviews.find(
        (r) => r.user.toString() === user_id.toString()
      );
      if (alreadyReviewed) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Product already Reviewed",
          },
        };
      }
      const user = await Users.find({ _id: user_id });
      if (!user) {
        return {
          status: 305,
          success: true,
          element: {
            msg: "Users not exit",
          },
        };
      }
      const review = {
        rating: Number(rating),
        comment,
        user: user_id,
      };
      const { success } = await createReview(product, review);
      if (!success) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Comment Fail",
          },
        };
      }
      return {
        status: 200,
        success: true,
        element: {
          msg: "Comment Product Success",
        },
      };
    }
  },
  handleEditReview: async ({ comment, user_id, product_id, review_id }) => {
    const product = await Products.findById({ _id: product_id });
    const user = await Users.find({ _id: user_id });
    if (!user) {
      return {
        status: 305,
        success: true,
        element: {
          msg: "Users not exit",
        },
      };
    }
    const { success } = await editReview(
      product,
      comment,
      review_id,
      user_id,
      product_id
    );
    if (!success) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Edit Comment Fail",
        },
      };
    }
    return {
      status: 200,
      success: true,
      element: {
        msg: "Edit Review Success !!",
      },
    };
  },
  handleDeleteReview: async ({ user_id, product_id, review_id }) => {
    const product = await Products.findById({ _id: product_id });
    const user = await Users.find({ _id: user_id });
    if (!user) {
      return {
        status: 305,
        success: true,
        element: {
          msg: "Users not exit",
        },
      };
    }
    const { success } = await deleteReview(
      product,
      user_id,
      product_id,
      review_id
    );
    if (!success) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Delete Comment Fail",
        },
      };
    }
    return {
      status: 200,
      success: true,
      element: {
        msg: "Delete Review Success !!",
      },
    };
  },
};
