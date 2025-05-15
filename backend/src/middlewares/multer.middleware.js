const multer = require('multer');
const path = require('path')

const myStroage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"path") //! "/upload/temp/" make sure that folder structure  is present  
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"___" +file.originalname )//"upload/temp"
    },
})

let upload=multer({storage:myStroage});
module.exports = {upload};


//!multimedia => image , audio,video ,files (doc,pdf,etc...)
