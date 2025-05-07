const express = require('express');
require("dotenv").config();

const userRoutes = require("./src/routes/user.routes")
const app = express();

//! middleware section
app.use(express.json());
app.use("/user/v1",userRoutes)

module.exports = app;