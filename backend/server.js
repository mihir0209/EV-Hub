// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to create a payment order
app.post('/create-order', (req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_7o3RtzkN0yvmqY', // Replace with your Razorpay Key ID
        key_secret: 'axrU2uTIwqeYPcPPDrHDKWhm' // Use your test secret key
    });

    const options = {
        amount: req.body.amount, // Amount in paise
        currency: 'INR',
        receipt: 'receipt#1', // Optional receipt ID
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(order);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});