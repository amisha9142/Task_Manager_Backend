const express = require("express")
const { createTask, getAllTask, getOneTask, updateOneTask, deleteTask} = require("../controllers/task")
const route = express.Router()

route.post("/createtask",createTask)
route.get("/gettask",getAllTask)
route.get("/getonetask/:id",getOneTask)
route.put("/updateatask/:id",updateOneTask)
route.put("/deleteatask/:id",deleteTask)

module.exports = route
