const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const { validateName, validateEmail, validatePassword ,validatePhone} = require("../utilis/validation");


exports.signup = async(req,res)=>{
    try{
        const{name,phone,email,password} = req.body;
        if(!name){
            return res.status(422).json({status:false,message:"name is mandatory to fill"})
        }
        if(!email){
            return res.status(422).json({status:false,message:"email is mandatory to fill"})
        }
        if(!password){
            return res.status(422).json({status:false,message:"password is mandatory to fill"})
        }
        if(!phone){
            return res.status(422).json({status:false,message:"phone is mandatory to fill"})
        }
        if(!validateName(name)){
            return res.status(400).json({status:false,message:"name is invalid"})
        }
        if(!validateEmail(email)){
            return res.status(400).json({status:false,message:"email is invalid"})
        }
        if(!validatePassword(password)){
            return res.status(400).json({status:false,message:"password is invalid "})
        }
        if(!validatePhone(phone)){
            return res.status(400).json({status:false,message:"phone no is invalid"})
        }

        const existingEmail = await User.findOne({
            email:email
        })
        if(existingEmail){
            return res.status(400).json({status:false,message:"email already exist"})
        }

        const existingPhone = await User.findOne({
            phone:phone
        })
        if(existingPhone){
            return res.status(400).json({status:false,message:"phone already exist"})
        }

        // if (!req.files["profileImage"]){
        //     return res.status(400).json({status:false,message:"profileImage is missing"})
        // }
        // const profileImageFileLocation = req.files["profileImage"][0].location

        const bcryptPassword = await bcrypt.hash(password,10)

        const signup = await User.create({
            name,
            phone,
            email,
            password:bcryptPassword,
            // profileImage:profileImageFileLocation
        })

        const token = jwt.sign({userId:signup._id}, process.env.JWT_SECRET,{
            expiresIn :"9d"
        })
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 9, // 9 din ke liye in seconds
            sameSite: 'strict'
        }));
  
        return res.status(201).json({status:true,message:"user registered successfully",token,data:signup})
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({status:false,message:"internal server error"})
    }
}



// login 
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email){
            return res.status(422).json({status:false,message:"email is required"})
        }
        if(!password){
            return res.status(422).json({status:false,message:"password is required"})
        }
     
        if(!validateEmail(email)){
            return res.status(400).json({status:false,message:"email must contain characters,numbers,special character & end with .in or .com "})
        }
        if(!validatePassword(password)){
            return res.status(400).json({status:false,message:"password must contain one Uppercase , one lowercase , one digit and one specail characters"})
        }

        const existingEmail = await User.findOne({
            email:email
        })
        if(!existingEmail){
            return res.status(500).json({status:false,message:"invalid email or password"})
        }

        const bcryptPassword = await bcrypt.compare(password,existingEmail.password)
        if(!bcryptPassword){
            return res.status(400).json({status:false,message:"invalid email or password."})
        }

        return res.status(201).json({status:true,message:"user login successfully",
        data:existingEmail})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// get user profile
exports.GetUserProfile = async(req,res)=>{
    try{
        const UserProfile = await User.find()
        return res.status(200).json({status:true,message:"fetched user profile successfully",data:UserProfile})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// update user profile
exports.updateUserProfile = async(req,res)=>{
    try{
        const {id} = req.params
        const {name,email,phone,password} = req.body
        
        const updateUser = await User.findOneAndUpdate({
            _id:id
        },{
            name,
            email,
            phone,
            password
        },{
            new:true
        })
        return res.status(200).json({status:true,message:"user profile update successfully",data:updateUser})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,messagae:"internal server error"})
    }
}


// delete user profile
exports.deleteUserProfile = async(req,res)=>{
    try{
        const {id} = req.params
        const DeleteUser = await User.findOneAndUpdate(
            {_id:id},
            {$set:{isDeleted:true}}
        )
        if(!DeleteUser){
            return res.status(400).json({status:false,message:"user not found"})
        }
        return res.status(200).json({status:true,message:"user profile deleted successfully",data:DeleteUser})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}

