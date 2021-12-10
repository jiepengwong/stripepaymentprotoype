// Setting of express server here

// Loading of env variables
require("dotenv").config();

const express = require("express");
const app = express();

// Calling like an API to the express backend server, convert into json
app.use(express.json());

//set up stripe

// this would be the API access key
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Simple data base here, there is a huge secruity list here because we dont want user to edit the price
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Fintech Course" }],
  [2, { priceInCents: 20000, name: "Learn CSS" }],
]);

// This is the port number here
app.listen(3000);
