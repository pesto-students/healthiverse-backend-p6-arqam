import express from 'express';
import Stripe from 'stripe';
const stripe = Stripe("sk_test_51MwgmMSEwiVRPen94ahtpvX07YWOmwpLhwMOzyevHhI3YSbqrGyxzwXSCQUJdW9CwZZpB36ad9LyRpSgMKFKd2WC00AdhfIr18");


const stripeRouter = express.Router();

stripeRouter.get("/", (req, res) => {
    console.log("Stripe get request");
    res.json({ message: "It works" });
});

stripeRouter.post("/pay", async (req, res) => {
    const { product } = req.body;
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3004/success",
        cancel_url: "http://localhost:3004/failed",
    });
    res.json({ id: session.id });
});

export default stripeRouter;