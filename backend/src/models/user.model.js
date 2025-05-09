const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
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
      phoneNumber:{
         type:Number,
         required:[true,"Phone number is required"],
         minlength:[10,"minimum lenght should be 10"]
      },
      tokenVersion:{
        type:Number,
        default:0
      },
      role:{
        type:String,
        enum:["user","admin"],
        default:"user"
      },
},

  { timestamps:true});


  //!password hashing
  userSchema.pre("save",async function (){
    let salt = await bcryptjs.genSalt(12); //random string
    let hashedPassword = await bcryptjs.hash(this.password, salt); //hashing the password
    this.password = hashedPassword;
  })


userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password)
};

  
module.exports = mongoose.model("User",userSchema)