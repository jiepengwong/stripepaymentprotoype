// Setting of express server here

// Loading of env variables
require("dotenv").config();

const express = require("express");
const app = express();

// Calling like an API to the express backend server, convert into json
app.use(express.json());

app.use(express.static("public"))
//set up stripe
// asdasdaoskdoakdaskdasdasdas

// this would be the API access key
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Simple data base here, there is a huge secruity list here because we dont want user to edit the price
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Fintech Course" }],
  [2, { priceInCents: 20000, name: "Learn CSS" }],
]);

// This is the port number here
app.post('/create-checkout-session', async(req,res) => {
  try{
    //  Creation of stripe session, this is a default function
    const session = await stripe.checkout.sessions.create({
      // Declaratuib of payment methods
      payment_method_types: ['card'],
      //  Can choose one time payment or subscription
      mode:"payment",
      // Array of items which we are sending down to purchase, from the script.js
      line_items: req.body.items.map(item =>{
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency:"usd",
            // NAME OF PRODUCT
            product_data:{
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`

    })
    res.json({url: session.url})

  }catch(e) {
    res.status(500).json({error: e.message})
  }
    res.json({url: session.url})
})
app.listen(3000);
