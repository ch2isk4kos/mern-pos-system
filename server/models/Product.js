const mongoose = require("mongoose");

let product = mongoose.Schema(
  {
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    distro: {
      type: String,
    },
    id: {
      type: String,
    },
    price: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

let Product = mongoose.model("product", product);
module.exports = Product;
