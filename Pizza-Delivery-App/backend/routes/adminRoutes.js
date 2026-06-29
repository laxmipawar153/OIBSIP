const express = require("express");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");

const router = express.Router();

/*
========================================
ADMIN DASHBOARD DATA
========================================
*/
router.get("/dashboard", async (req, res) => {
  try {
    
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Total Pizzas
    const totalPizzas = await Pizza.countDocuments();

    // Low Stock Items
    const lowStockItems = await Inventory.countDocuments({
      stock: { $lte: 20 },
    });

    // Recent Orders
    const recentOrders = await Order.find()
  .populate("user", "name email")
  .sort({ createdAt: -1 })
  .limit(5);

  // Orders by Status

const orderStatusData = await Order.aggregate([
  {
    $group: {
      _id: "$orderStatus",
      count: { $sum: 1 },
    },
  },
]);

// Inventory by Category

const inventoryCategoryData = await Inventory.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  },
]);

    res.json({
  totalOrders,
  totalRevenue,
  totalPizzas,
  lowStockItems,
  recentOrders,
  orderStatusData,
  inventoryCategoryData,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;