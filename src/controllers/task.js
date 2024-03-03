const Task = require("../models/task");

exports.createTask = async(req,res)=>{
    try{
        const{title,description,completed,isDeleted,DeletedAt} = req.body
        if(!title){
            return res.status(422).json({status:false,message:"title is required"})
        }
        if(!description){
            return res.status(422).json({status:false,message:"description is required"})
        }
        if(!completed){
            return res.status(422).json({status:false,message:"complete status is required"})
        }

        const task = await Task.create({
            title,
            description,
            completed,
            isDeleted,
            DeletedAt
        })
        return res.status(201).json({status:true,message:"task created successfully",data:task})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// get all task
exports.getAllTask = async(req,res)=>{
    try{
        const tasks = await Task.find()
        return res.status(200).json({status:true,message:"get your data",data:tasks})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}



// get one task by id
exports.getOneTask = async(req,res)=>{
    try{
        const task = await Task.findById({_id:req.params.id})
        return res.status(200).json({status:true,message:"get task by id",data:task})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// // update specfic task by id 
exports.updateOneTask = async(req,res)=>{
    try{
        const {id} = req.params
        const {title,description,completed} = req.body

        const updateATask = await Task.findOneAndUpdate({
            _id:id
        },{
            title,
            description,
            completed
        },{
            new:true
        })
        return res.status(200).json({status:true,message:"update a task successfully",data:updateATask})
    }
    catch(error){
        console.log(error.messagae)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// delete specific task by id 
exports.deleteTask = async(req,res)=>{
    try{
        const{id} = req.params
        const deleteATask = await Task.findOneAndUpdate(
            {_id:id},
            {$set:{isDeleted:true}}
        )
        if(!deleteATask || deleteATask.isDeleted == true){
            return res.status(400).json({status:false,message:"task not found or task is already deleted."})
        }
        return res.status(200).json({status:true,mesage:"task deleted successfully"})
    }
    catch(error){
        console.log(error.messsage)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}


// 