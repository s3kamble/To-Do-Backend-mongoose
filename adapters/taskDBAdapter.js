const uniqid = require("uniqid");
const {Task} = require("../models/taskDBModel");

const findAllTasks = async ()=>{
    return  await Task.find()
} 

const findOneTask = async ({taskId})=>{
    return await Task.findOne({"taskId":taskId})  
 }

const insertOneTask = async (data)=>{
    return await Task.create({
        taskId:uniqid(),
        content:data.body.content,
        createdAt:data.body.createdAt,
        updatedAt:data.body.updatedAt
    })
 } 

 const deleteOneTask = ({taskId})=>{
    return Task.deleteOne({taskId:taskId})
 } 


 const updateOneTask = ({taskId,data})=>{
    return Task.updateOne({taskId:taskId},{content:data.content,createdAt:data.createdAt,updatedAt:data.updatedAt,isComplete:data.isComplete})
 
 } 

module.exports = {
    findAllTasks,
    findOneTask,
    insertOneTask,
    deleteOneTask,
    updateOneTask
}