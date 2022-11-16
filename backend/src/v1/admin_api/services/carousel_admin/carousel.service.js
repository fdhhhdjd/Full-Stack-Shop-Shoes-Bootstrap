const Carousel = require("../../../models/CarouselModel");
const HELPER = require("../../../utils/helper");
const CONSTANTS = require("../../../configs/constants");
const STORAGE = require("../../../utils/storage");
const { get, set } = require("../../../utils/limited_redis");
const {
  createCarousel,
  editCarousel,
  deleteCarousel,
} = require("./crud_carousel.service");
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

      await set(
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
  handleCreateCarousel: async ({ heading, descriptions, image }) => {
    try {
      if (!image)
        return {
          status: 400,
          success: false,
          element: {
            msg: "No image upload",
          },
        };
      const checkExitCarousel = await STORAGE.checkCarouselExit(heading);
      if (checkExitCarousel.length > 0) {
        return {
          status: 400,
          success: false,
          element: { msg: "Carousel Exit" },
        };
      }
      await createCarousel(heading, descriptions, image);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Create carousel successfully!!",
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
  handleEditCarousel: async ({ heading, descriptions, image, _id }) => {
    try {
      if (!image)
        return {
          status: 400,
          success: false,
          element: {
            msg: "No image upload",
          },
        };
      const checkExitCarousel = await STORAGE.checkCarouselExitExceptUserMain(
        _id,
        heading
      );
      if (checkExitCarousel.length > 0) {
        return {
          status: 400,
          success: false,
          element: { msg: "Carousel Exit" },
        };
      }
      await editCarousel(heading, descriptions, image, _id);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Edit carousel successfully!!",
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
  handleDeleteCarousel: async ({ _id }) => {
    try {
      await deleteCarousel(_id);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Delete carousel successfully!!",
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
};
