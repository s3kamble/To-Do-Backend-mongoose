
const sendResponse = require("../utils/sendResponse");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});

let source=process.env.STORAGE

let obj;
const dataPath = (req,res,next)=>{
    switch(source){
        case "database":
            obj = require("../adapters/taskDBAdapter.js");
            break;

        case "file":
           obj= require("../adapters/taskFileAdapter.js");
            break
    }

    next();
}
const getAllTasks = async (req,res) =>{ 
    let data =await obj.findAllTasks() ;
   
    if(!data){
      return sendResponse({res:res,statusCode:404,message:"Data not fetched",error:"No data found"});
    }
    return sendResponse({res:res,statusCode:200,message:"Data fetched",data:await data});
};

const getTaskById = async (req,res,next) =>{
    let {taskId} = req.params;
    let taskFound =await obj.findOneTask({taskId:taskId }) ;

    if(!taskFound){
      return sendResponse({res:res,statusCode:404,message:"Task not fetched",error:"ID not found"});
    }
    sendResponse({res:res,statusCode:200,message:"Data fetched",data:taskFound});
}

// const validation = (req,res,next) =>{
//     if(!req.body.content){
//         return sendResponse({
//             res,
//             statusCode: 404,
//             message: "Empty content",
//             error: "Empty content not allowed",
//         });
//     }
//    let validKeys = ["content", "createdAt", "updatedAt"];
//    if (req.params.isComplete){
//         validKeys.push("isComplete") ;
//    }

//    validKeys.sort();
//    let invalidKeyCount=0;

//    validKeys.forEach((key)=>{
//         if(Object.keys(req.body).sort().indexOf(key) == -1){ 
//             invalidKeyCount=+1
//         }
//    });
//    if(invalidKeyCount>0){
//           return sendResponse({res:res,statusCode:404,message:"Please provide all necessary keys",error:"Invalid request"});
//    }
//     next();
// }

const createTask = async(req,res,next) =>{
    
    let newTaskAdd = await obj.insertOneTask(req);
    if(!newTaskAdd){
         return sendResponse({res:res,statusCode:500,message:"Error in creating task",error:"Error in adding data to server"});           
    }
    sendResponse({res:res,statusCode:200,message:"Task Added",data:newTaskAdd});
}

const deleteTask = async(req,res,next) =>{
  
    let {taskId} = req.params;
    let taskToDelete = await obj.deleteOneTask({taskId:taskId});
    if(taskToDelete.deletedCount == 0){
        return sendResponse({res:res,statusCode:500,message:"Error in deleting task",error:"Invalid task id"});         
   }
   sendResponse({res:res,statusCode:204,message:"Successfully deleted task"});
}

const updateTask = async (req,res,next) =>{

    let {taskId} = req.params;
    let updateData=await obj.updateOneTask({taskId:taskId,data:req.body});
    if(updateData.nModified == 0 || updateData == "Data not found"){
            return sendResponse({res:res,statusCode:500,message:"Error in updating data",error:"Id not found"});
      }
    sendResponse({res:res,statusCode:200,message:"Successfully updated task"});
    
    
}

module.exports = {
    getAllTasks,
    getTaskById,
   
    createTask,
    deleteTask,
    updateTask,
    dataPath
};