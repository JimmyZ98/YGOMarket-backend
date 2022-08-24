const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const listingRoutes = require("./routes/listingRoute");
const usersRoutes = require("./routes/users");
const paymentRoutes = require("./routes/paymentRoute");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", listingRoutes);
app.use("/", usersRoutes);
app.use("/", paymentRoutes);

app.listen(port, () => console.log(`Server is listening on ${port}`));
