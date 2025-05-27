const express = require('express');
require("dotenv").config();
const error = require("./src/middlewares/error.middleware")

const userRoutes = require("./src/routes/user.routes");
const foodRoutes = require("./src/routes/food.routes")
const cartRoutes=require("./src/routes/cart.routes")
const orderRoutes = require("./src/routes/order.routes")
const cookieParser = require('cookie-parser');
const { upload } = require('./src/middlewares/multer.middleware');
const app = express();

//! middleware section
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())
app.use("/user/v1",userRoutes)
app.use("/cart/v1",cartRoutes)
app.use("/foods/v1",foodRoutes,upload.single("image"))
app.use("/orders/v1",orderRoutes)


//! error middleware
app.use(error);
module.exports = app;