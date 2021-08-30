const fs = require("fs");
const path = require("path");
const Task = require("../models/taskFileModel");
const dataSource = path.join(__dirname,"..","data","tasks.json");
const Tasks = JSON.parse(fs.readFileSync(dataSource,"utf-8"));

const findAllTasks =  ()=>{
    return Tasks
} 

const findOneTask = ({taskId})=>{
    return  Tasks.find(task =>task.taskId === taskId)  
 }

const insertOneTask =  (data)=>{
    let newTask = new Task(data.body);
    Tasks.push(newTask);

    fs.writeFile(dataSource, JSON.stringify(Tasks,null,2), (err)=>{
        if(err){
            Tasks.pop()
            return err;           
        }
     
    })
    return Tasks[Tasks.length-1]
   
 } 

const deleteOneTask = ({taskId}) =>{
    const taskToDelete= Tasks.find(task =>task.taskId==taskId);
    const index = Tasks.indexOf(taskToDelete);
   
    if (index=== -1) {
        return "Task not found";
    }
    
    Tasks.splice(index, 1);

    fs.writeFile(dataSource,JSON.stringify(Tasks,null,2),(err) =>{
        if(err){
            Tasks.pop();
            return err;
        }
    });
    return "Successfuly deleted data"

}

const updateOneTask = ({taskId,data}) =>{
    const taskToUpdate = Tasks.find(task =>task.taskId==taskId);
    const index = Tasks.indexOf(taskToUpdate);
    if (index === -1) {
        return "Data not found";
    }
    
   Object.keys(data).forEach((key)=>{
        Tasks[index][key] = data[key];
    });

   fs.writeFile(dataSource,JSON.stringify(Tasks,null,2),(err) =>{
        if(err){
            return err;
        }
    });
    return Tasks[index];

}

module.exports = {
    findAllTasks,
    findOneTask,
    insertOneTask,
    deleteOneTask,
    updateOneTask
}