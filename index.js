const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config({path:"./.env"});
const userRoute = require("./src/routes/user")
const taskRoute = require("./src/routes/task")

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoute)
app.use("/api/task",taskRoute)

app.use(multer().any());


mongoose.connect(process.env.DB).then(()=>{
    console.log("mongodb connected!!")
}).catch((error)=>{
    console.log(error.message)
})


port = process.env.PORT
app.listen(port, function(){
    console.log(`app is listening on port ${port}`)
})
