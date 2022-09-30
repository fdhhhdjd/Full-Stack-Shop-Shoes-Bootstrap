// var amqp = require("amqplib");
// require("dotenv").config({ path: __dirname + "../../../../../.env" });
// const CONFIGS = require("../configs/config");
// var connection, channel;

// const connect_amqp = async () => {
//   connection = await amqp.connect(CONFIGS.RABBIT_MQ);
//   channel = await connection.createChannel();
//   await channel.assertQueue("BUY_PRODUCT");
// };
// connect_amqp().then(() => {
//   channel.consume("ORDER_PRODUCT", (data) => {
//     console.log(
//       "Co nguoi mua hang roi anh em:::",
//       JSON.stringify(data.content)
//     );
//   });
// });
// module.exports = connect_amqp;
