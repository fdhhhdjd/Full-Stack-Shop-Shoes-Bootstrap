const {
  getProductId,
  createProductNew,
  editProductNew,
  deleteProduct,
} = require("./Curd_products.service");
const {
  checkProductExitExceptUserMain,
  checkProductExit,
} = require("../../../utils/storage");
const APIfeatures = require("../../../strategy_pattern/APIfeatures");
const Products = require("../../../models/ProductModel");
module.exports = {
  handleGetallProduct: async ({ req }) => {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting();

    const products = await features.query.populate("categories");
    return {
      status: 200,
      success: true,
      element: products,
    };
  },
  handleProductId: async ({ product_id }) => {
    const products = await getProductId(product_id);
    if (!products) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Product Not Found",
        },
      };
    }
    return {
      status: 200,
      success: true,
      element: products,
    };
  },
  handleCreateProduct: async ({
    name,
    image,
    description,
    rating,
    price,
    countInStock,
    numReviews,
    categories,
  }) => {
    const checkExitProduct = await checkProductExit(name);
    if (!image) {
      return {
        status: 400,
        success: false,
        element: { msg: "No image upload" },
      };
    }
    if (checkExitProduct.length > 0) {
      return {
        status: 400,
        success: false,
        element: { msg: "Product Exit" },
      };
    }

    await createProductNew(
      name,
      image,
      description,
      rating,
      price,
      countInStock,
      numReviews,
      categories
    );

    return {
      status: 200,
      success: true,
      element: { msg: "Create Product Successfully" },
    };
  },
  handleEditProduct: async ({
    name,
    image,
    description,
    rating,
    price,
    countInStock,
    numReviews,
    categories,
    product_id,
  }) => {
    if (!image) {
      return {
        status: 400,
        success: false,
        element: { msg: "No image upload" },
      };
    }
    const checkExitProduct = await checkProductExitExceptUserMain(
      product_id,
      name
    );

    if (checkExitProduct.length > 0) {
      return {
        status: 400,
        success: false,
        element: { msg: "Product Exit" },
      };
    }
    await editProductNew(
      name,
      image,
      description,
      rating,
      price,
      countInStock,
      numReviews,
      categories,
      product_id
    );
    return {
      status: 200,
      success: true,
      element: { msg: "Edit Product Successfully" },
    };
  },
  handleDeleteProduct: async ({ product_id }) => {
    if (!product_id) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Delete Product Fail",
        },
      };
    }
    await deleteProduct(product_id);
    return {
      status: 200,
      success: true,
      element: { msg: "delete Product Successfully" },
    };
  },
};
