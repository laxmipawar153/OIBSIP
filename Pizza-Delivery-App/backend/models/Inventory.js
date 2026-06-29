const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({

    itemName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Base", "Sauce", "Cheese", "Vegetable"],
        required: true
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    threshold: {
        type: Number,
        default: 20
    }

});

module.exports = mongoose.model("Inventory", inventorySchema);