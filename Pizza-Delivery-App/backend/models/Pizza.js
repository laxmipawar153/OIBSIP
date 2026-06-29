const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true
    },

    description: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Pizza", pizzaSchema);