const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
=========================================
PLACE ORDER
=========================================
*/

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentId,
      razorpayOrderId,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentStatus: "Paid",
      paymentId,
      razorpayOrderId,
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
=========================================
GET MY ORDERS
=========================================
*/

router.get("/my-orders", authMiddleware, async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

/*
=========================================
GET ALL ORDERS (ADMIN)
=========================================
*/

router.get("/", async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

/*
=========================================
UPDATE ORDER STATUS
=========================================
*/

router.put("/:id", async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus,
      },
      {
        new: true,
      }
    );

    if (!order) {

      return res.status(404).json({
        message: "Order Not Found",
      });

    }

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;