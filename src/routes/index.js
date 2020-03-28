const { Router } = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.secretStripe);
const router = Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    const charge = await stripe.charges.create({
        amount: '3000',
        description: 'Video Editing Software',
        currency: 'usd',
        customer: customer.id
    });
    // Save this charge in your database
    console.log(charge.id);
    // Finally Show a Success View
    res.render('download');
});

module.exports = router;