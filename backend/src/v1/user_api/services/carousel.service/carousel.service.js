const { set, get } = require("../../../utils/limited_redis");
const Carousel = require("../../../models/CarouselModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
module.exports = {
  handleGetallCarousel: async () => {
    try {
      const carousel_user_redis = await get("carousel");
      if (carousel_user_redis) {
        return {
          status: 200,
          success: true,
          element: {
            carousels: JSON.parse(carousel_user_redis),
          },
        };
      }
      const number_random = HELPER.randomNumber();

      const carousels = await Carousel.aggregate([
        {
          $project: {
            doc: "$$ROOT",
            latest: {
              $cond: {
                if: { $gt: ["$createdAt", "$updatedAt"] },
                then: "$createdAt",
                else: "$updatedAt",
              },
            },
          },
        },
        { $sort: { latest: -1 } },
      ]);

      set(
        "carousel",
        JSON.stringify(carousels),
        CONSTANTS._1_DAYS_REDIS + number_random
      );
      return {
        status: 200,
        success: true,
        element: {
          carousels,
        },
      };
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
