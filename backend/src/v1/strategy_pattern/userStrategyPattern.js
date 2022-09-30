// const STORAGE = require("../../utils/storage");
// const emailExit = async (originalPrice) => {
//   const user_email_exits = await STORAGE.checkUserExit(originalPrice);
//   if (user_email_exits) {
//     return {
//       status: 307,
//       success: false,
//       element: {},
//     };
//   }
//   return {
//     success: true,
//   };
// };
// const phoneAllPhone = async (originalPrice) => {
//   if (isNaN(phone_number)) {
//     return {
//       status: 306,
//       success: false,
//       element: {
//         msg: "Phone is must be number.",
//       },
//     };
//   }
//   const check_phone_vietnamese = HELPER.isVietnamesePhoneNumber(phone_number);
//   if (!check_phone_vietnamese) {
//     return {
//       status: 400,
//       success: false,
//       element: {
//         msg: "Incorrect phone number.",
//       },
//     };
//   }
//   const user_phone_exits = await STORAGE.checkPhoneExit(phone_number);
//   if (user_phone_exits) {
//     return {
//       status: 306,
//       success: false,
//     };
//   }
//   return {
//     success: true,
//   };
// };

// const getPriceStrate = {
//   emailExit: emailExit,
//   phoneAllPhone: phoneAllPhone,
// };

// function checkStrategyUser(originalPrice, typePromotion) {
//   return getPriceStrate[typePromotion](originalPrice);
// }
// module.exports = {
//   checkStrategyUser,
// };
// // console.log("--->>>", getPrice(200, "default"));
