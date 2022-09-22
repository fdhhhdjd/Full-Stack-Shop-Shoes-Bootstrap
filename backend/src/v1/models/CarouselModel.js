const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carousel", carouselSchema);
