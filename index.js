const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const listingRoute = require("./routes/listingRoute");
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/", listingRoute);
app.use("/buy", listingRoute);

app.listen(port, () => console.log(`Server is listening on ${port}`));
