// src/Payment.js

import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();

        if (amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/create-order', {
                amount: amount * 100 // Convert to paise
            });

            const options = {
                key: 'rzp_test_7o3RtzkN0yvmqY', // Replace with your Razorpay Key ID
                amount: response.data.amount,
                currency: 'INR',
                name: name,
                description: 'Test Transaction',
                order_id: response.data.id,
                handler: function(response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: name,
                    email: email,
                },
                theme: {
                    color: '#F37254'
                },
                modal: {
                    ondismiss: function() {
                        alert('Payment failed or dismissed');
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            alert('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Razorpay Payment Gateway Integration</h1>
            <form onSubmit={handlePayment}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;