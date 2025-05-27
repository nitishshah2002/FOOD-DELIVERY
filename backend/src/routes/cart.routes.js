const {Router}= require("express");

const {addFoodToCart,removeFoodFromCart,getCart}=require("../controllers/cart.controller");

const {authenticate}=require("../middlewares/authenticate.middleware")

const router= Router();

router.patch('/add-to-cart',authenticate,addFoodToCart)
router.patch('/remove-cart',authenticate,removeFoodFromCart)
router.get('/get-cart',authenticate,getCart)

module.exports=router;