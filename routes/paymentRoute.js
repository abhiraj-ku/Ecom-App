const express = require("express");
const router = express.Router();
const {
  sendStripeKey,
  sendRazorpayKey,
  captureStripePayments,
  captureRazorPayPayments,
} = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userData");

//routes for capturing secret_key
router.get("/stripekey", isLoggedIn, sendStripeKey);
router.get("/razorpaykey", isLoggedIn, sendRazorpayKey);

// routes for handling the payments
router.post("/pay/stripepay", isLoggedIn, captureStripePayments);
router.post("/pay/razorpay", isLoggedIn, captureRazorPayPayments);

module.exports = router;
