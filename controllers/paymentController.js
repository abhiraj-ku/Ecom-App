const BigPromise = require("../middlewares/bigPromise");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Stripe methods

exports.sendStripeKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    stripeKey: process.env.STRIPE_API_KEY,
  });
});

// Stripe payment intent to open a payments page of stripe
exports.captureStripePayments = BigPromise(async (req, res, next) => {
  // payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    // payment_method_type: ["card"],

    //optional integration checks
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({
    success: true,
    amount: req.body.amount,
    client_secret: paymentIntent.client_secret,
  });
});

// Razorpay methods

// this sends the razorpay secret key to db
exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorPayKey: process.env.RAZORPAY_API_KEY,
  });
});

// Razorpay payment intent to open a payments page of razorpay
exports.captureRazorPayPayments = BigPromise(async (req, res, next) => {
  // payment intent
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt#1",
  };

  const myOrder = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: myOrder,
  });
});
