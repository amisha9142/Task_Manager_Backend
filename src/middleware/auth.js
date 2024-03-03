const jwt = require("jsonwebtoken")
const User = require("../models/user")

exports.isAuthenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.token
        console.log(token)
        if(!token){
            return res.status(422).json({status:false,message:"token is missing"})
        }
        console.log("dsfsdfs")
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodedData.id)
        req.user = await User.findOne({_id:decodedData.id})
        console.log(req.user)
        next()
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({Status:false,message:"internal server error"})
    }
}
