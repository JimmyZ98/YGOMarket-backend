const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const listingRoutes = require("./routes/listingRoute");
const usersRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/", listingRoutes);
app.use("/buy", listingRoutes);
app.use("/", usersRoutes);

app.listen(port, () => console.log(`Server is listening on ${port}`));
