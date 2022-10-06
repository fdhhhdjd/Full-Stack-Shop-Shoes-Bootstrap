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
module.exports = {
  updateOrderDelete,
};
