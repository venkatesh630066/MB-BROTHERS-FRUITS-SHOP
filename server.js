const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

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
        console.error(error);

        res.status(500).json({
            error: "Unable to create payment order"
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