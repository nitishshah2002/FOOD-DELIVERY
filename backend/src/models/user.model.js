const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      name:{
        type:String,
        required:[true,"name is required"]
      },
      email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
      },
      password:{
        type:String,
        required:[true,"password is required"],
        minlength:[7,"minimum length should we seven"],
      },
      cartData:{
        type:Object,
       default:{}
      },
      role:{
        type:String,
        enum:["user","admin"],
        default:"user"
      },
},

  { timestamps:true})

module.exports = mongoose.model("User",userSchema)