const Payments = require("../../../models/PaymentModel");
const CONSTANTS = require("../../../configs/constants");
const updateOrderDelete = async (payment_id) => {
  await Payments.findByIdAndUpdate(
    { _id: payment_id },
    {
      deleteAt: CONSTANTS.DELETED_DISABLE,
    }
  );
};
const getAllOrder = async () => {
  return await Payments.find({ deleteAt: CONSTANTS.DELETED_DISABLE })
    .populate("user_id")
    .sort({ createdAt: -1 });
};
const getAllOrderDelete = async () => {
  return await Payments.find({ deleteAt: CONSTANTS.DELETED_ENABLE })
    .populate("user_id")
    .sort({ createdAt: -1 });
};
const updateStatusOrder = async (order_status, id) => {
  await Payments.findByIdAndUpdate(
    { _id: id },
    { order_status, updatedAt: Date.now }
  );
};
const getDetailOrder = async (order_id) => {
  return await Payments.findById(order_id);
};
module.exports = {
  updateOrderDelete,
  getAllOrder,
  updateStatusOrder,
  getDetailOrder,
  getAllOrderDelete,
};
