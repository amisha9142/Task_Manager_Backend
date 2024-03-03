const mongoose = require("mongoose")
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default: false
    },
    DeletedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const Task = mongoose.model("Task",TaskSchema)
module.exports = Task