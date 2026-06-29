const express = require("express");
const Pizza = require("../models/Pizza");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


const router = express.Router();

// GET ALL PIZZAS
router.get("/", async (req, res) => {

    try {

        const pizzas = await Pizza.find();

        res.json(pizzas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET PIZZA BY ID
router.get("/:id", async (req, res) => {

    try {

        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {

            return res.status(404).json({
                message: "Pizza not found"
            });

        }

        res.json(pizza);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// UPDATE PIZZA
router.put("/:id", async (req, res) => {

    try {

        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!pizza) {

            return res.status(404).json({
                message: "Pizza not found"
            });

        }

        res.json({
            message: "Pizza Updated Successfully",
            pizza
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// DELETE PIZZA
router.delete("/:id", async (req, res) => {

    try {

        const pizza = await Pizza.findByIdAndDelete(req.params.id);

        if (!pizza) {

            return res.status(404).json({
                message: "Pizza not found"
            });

        }

        res.json({
            message: "Pizza Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ADD PIZZA
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {

    try {

        const pizza = await Pizza.create(req.body);

        res.status(201).json({
            message: "Pizza Added Successfully",
            pizza
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;