const jwt = require("jsonwebtoken");
const asyncHnandler = require("express-async-handler");

const generateToken = asyncHnandler(async (id,tokenVersion)=>{
         const token= jwt.sign({id,tokenVersion},"secret-key",{
            expiresIn:"1d",
          });
          return token;
})

module.exports = {generateToken};