const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please include the product name"],
    },
    features: {
        type: String,
    },
    price: {
        type: String,
        required: [true, "Please include the product price"],
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;