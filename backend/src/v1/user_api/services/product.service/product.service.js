const {
  getallProductUser,
  getallProductUserDetail,
} = require("./getproduct.service");

module.exports = {
  HandleGetProduct: async () => {
    const products = await getallProductUser();
    return {
      status: 200,
      success: true,
      element: products,
    };
  },
  HandleGetProductDetail: async ({ product_id }) => {
    const product_detail = await getallProductUserDetail(product_id);
    return {
      status: 200,
      success: true,
      element: product_detail,
    };
  },
};
