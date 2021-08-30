const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
    taskId:{
        type:String,
        unique:true,
        required:[true,"Task cannot be created without taskId"],
    },
    content:{
        type:String,
        required:[true,"Task cannot be created without content"],
        minlength:[1,"Content cannot be empty"]
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:String,
        required:[true," Failed to fetch ,task creation time "],
    },
    updatedAt:{
        type:String,
        default:" ",

    },

});

const Task = mongoose.model("Tasks",taskSchema);

module.exports = {
    Task,
    taskSchema
};