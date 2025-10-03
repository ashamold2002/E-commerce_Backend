const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    // fetch product details from DB
    const line_items = await Promise.all(
      items.map(async (it) => {
        const prod = await Product.findById(it.id);
        if (!prod) throw new Error(`Product not found: ${it.id}`);
        return {
          price_data: {
            currency: 'usd',
            product_data: { name: prod.title, description: prod.description },
            unit_amount: Math.round(prod.price * 100), // in cents
          },
          quantity: it.qty,
        };
      })
    );

const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '');
if (!frontendUrl) {
  throw new Error("FRONTEND_URL not set in environment");
}
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items,
  mode: 'payment',
  success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${frontendUrl}/cart`,
  customer_email: customerEmail,
});


    // 🔑 Important: send session URL for new Stripe integration
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook to handle checkout.session.completed
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;

    console.log('Payment succeeded for', customerEmail);

    // Save minimal order record (demo)
    await Order.create({
      user: null,
      products: [], // store items if needed
      amount: session.amount_total / 100,
      paymentStatus: 'paid',
      paymentIntentId: session.payment_intent,
    });
  }

  res.json({ received: true });
});

module.exports = router;
