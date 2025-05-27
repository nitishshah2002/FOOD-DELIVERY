const foodCollection=require("../models/food.model")
const userCollection = require("../models/user.model")

const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErorrHandler");

const addFoodToCart=asyncHandler(async(req,res)=>{
    // console.log(req.myUser);
    let foodId=req.body.foodId;
    let loggedInUser=req.myUser;
    let cartData = req.myUser.cartData;
    console.log(cartData);
    if(cartData[foodId]){
        cartData[foodId]+=1;
    }else{
        cartData[foodId]=1;
    }
    // await userCollection.updateOne({_id:loggedInUser})
    await userCollection.findByIdAndUpdate(loggedInUser._id,{cartData})

    res.status(200).json({
        success:true,
        message:"Food added to cart",
        data:cartData,
    })
})

const removeFoodFromCart=asyncHandler(async(req,res)=>{
    let foodId=req.body.foodId;
    let loggedInUser=req.myUser;
    let cartData = req.myUser.cartData;


    if(cartData[foodId]>1) cartData[foodId]-=1;
    else delete cartData[foodId]

    // cartData[foodId]-=1;
    // await userCollection.findByIdAndUpdate(loggedInUser._id,{cartData});

    res.status(200).json({
        success:true,
        message:"Remove from Cart successFully",
        data:cartData
    })

})

const getCart=asyncHandler(async(req,res)=>{
    let loggedInUser = req.myUser;
    console.log(Object.keys(loggedInUser.cartData));
    let keysArray=Object.keys(loggedInUser.cartData);

    if(keysArray==0) throw new ErrorHandler("Cart is Not found",404)

        let valueArray=Object.values(loggedInUser.cartData);
        console.log(valueArray)
        let items=valueArray.reduce((acc,curr)=>acc+curr,0)
      res.status(200).json({
        success:true,
        items:items,
        cart:loggedInUser.cartData,
      })
})


module.exports ={
    addFoodToCart,
    removeFoodFromCart,
    getCart
}