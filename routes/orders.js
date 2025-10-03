const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create order (after payment success)
router.post('/', async (req, res) => {
  // req.body: { user, products, amount, paymentStatus, paymentIntentId }
  const o = new Order(req.body);
  await o.save();
  res.json(o);
});

// GET orders - for demo
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('user').populate('products.product');
  res.json(orders);
});

module.exports = router;
