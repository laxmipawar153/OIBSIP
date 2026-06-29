const express = require("express");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

const router = express.Router();

// CREATE RAZORPAY ORDER
router.post("/create-order", async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// VERIFY PAYMENT

router.post("/verify-payment", (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature === razorpay_signature) {

            return res.json({

                success: true,

                message: "Payment Verified Successfully"

            });

        }

        return res.status(400).json({

            success: false,

            message: "Payment Verification Failed"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;