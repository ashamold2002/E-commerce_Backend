require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Needed for Stripe webhook raw body
const app = express();

// Routers
const stripeRouter = require('./routes/stripe');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

// ------------------ CORS ------------------
// Remove trailing slash from FRONTEND_URL in .env
const allowedOrigins = [
  'http://localhost:3000',
  'https://ashamold2002.github.io',
  'https://ashamold2002.github.io/Ecommerce-Demo'
];


app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // allow curl, Postman, mobile apps
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ------------------ BODY PARSERS ------------------
// Stripe webhook requires raw body
app.use('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

// JSON parser for all other routes
app.use(express.json());

// ------------------ ROUTES ------------------
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/stripe', stripeRouter);

// ------------------ DB & SERVER ------------------
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
