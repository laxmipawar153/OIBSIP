const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

// ADD INVENTORY ITEM
router.post("/", async (req, res) => {

    try {

        const item = await Inventory.create(req.body);

        res.status(201).json({
            message: "Inventory Item Added Successfully",
            item
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET ALL INVENTORY

router.get("/", async (req, res) => {

    try {

        const items = await Inventory.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE STOCK

router.put("/:id", async (req, res) => {

    try {

        const item = await Inventory.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });

        }

        res.json({

            message: "Stock Updated Successfully",

            item

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;