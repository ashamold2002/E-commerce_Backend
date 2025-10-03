const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  stock: { type: Number, default: 100 }
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
