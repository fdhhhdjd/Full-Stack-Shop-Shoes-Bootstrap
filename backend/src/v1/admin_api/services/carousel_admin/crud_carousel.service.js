const { del, set } = require("../../../utils/limited_redis");
const Carousel = require("../../../models/CarouselModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
module.exports = {
  createCarousel: async (heading, descriptions, image) => {
    ResetRedisCarousel();
    const newCarousel = new Carousel({ heading, descriptions, image });
    await newCarousel.save();
    return;
  },
  editCarousel: async (heading, descriptions, image, _id) => {
    ResetRedisCarousel();
    await Carousel.findOneAndUpdate(
      { _id: _id },
      { heading, descriptions, image }
    );
    return;
  },
  deleteCarousel: async (_id) => {
    ResetRedisCarousel();
    await Carousel.findByIdAndDelete(_id);
    return;
  },
};
const ResetRedisCarousel = async () => {
  await del("carousel");
  const random_number = HELPER.randomNumber();

  const carousel = await Carousel.aggregate([
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
  await set(
    "carousel",
    JSON.stringify(carousel),
    CONSTANTS._1_DAYS_REDIS + random_number
  );
};
