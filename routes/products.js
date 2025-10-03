const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET single
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Create product (for demo, no auth; in prod protect to admins)
router.post('/', async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

module.exports = router;
