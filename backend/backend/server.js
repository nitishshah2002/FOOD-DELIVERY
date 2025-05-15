const app = require("./app")
const {connectDB} = require("./src/configs/database")


connectDB()
.then(()=>{
    app.listen(process.env.PORT,(err)=>{
        if(err) console.log("error while satring the server");
        console.log(`Server running.......${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("error occcurec while connecting database");
    console.log(err);
    process.exit(1);
})

// app.listen(9000,(err)=>{
//     if(err) console.log("err while running server",err);
//     console.log(`server runnig......`);
// })
