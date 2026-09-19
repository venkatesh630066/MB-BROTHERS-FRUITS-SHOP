const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                error: "Invalid amount"
            });
        }

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: "mb_fruits_" + Date.now()
        });

        res.json(order);

    } catch (error) {
        console.error("Create Order Error:", error);

        res.status(500).json({
            error: "Unable to create payment order"
        });
    }
});

// Verify Razorpay Payment
app.post("/verify-payment", (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            return res.json({
                success: true,
                message: "Payment verified successfully"
            });
        }

        res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });

    } catch (error) {
        console.error("Verification Error:", error);

        res.status(500).json({
            success: false,
            message: "Verification error"
        });
    }
});

app.get("/", (req, res) => {
    res.send("MB Brothers Fruits Shop payment server is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});