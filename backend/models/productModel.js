const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
    },
    images: [
        {
            image: String
        }
    ],
    category: {
        type: String,
        required: true
    },
    seller: {
        type: String
    },
    stock: {
        type: String
    },
    numOfReviews: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);