const express = require('express');
require("dotenv").config();
const error = require("./src/middlewares/error.middleware")

const userRoutes = require("./src/routes/user.routes")
const app = express();

//! middleware section
app.use(express.json());
app.use("/user/v1",userRoutes)


//! error middleware
app.use(error);
module.exports = app;