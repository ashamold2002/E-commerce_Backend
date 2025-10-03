require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // needed for stripe webhook raw body
const app = express();

const stripeRouter = require('./routes/stripe');

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Important: stripe webhook requires raw body; mount before JSON bodyParser for the webhook route
app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

// other routes use json
app.use(express.json());

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/stripe', stripeRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.error(err));
