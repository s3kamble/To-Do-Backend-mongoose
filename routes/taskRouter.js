const {Router} = require("express");
const { getAllTasks, getTaskById , createTask, deleteTask, updateTask} = require("../controllers/taskController");
const {dataPath} = require("../controllers/taskController");

const router = Router();
const getMiddleware = [dataPath,getAllTasks];
const getByIdMiddleWare = [dataPath,getTaskById];
const postMiddleWare = [dataPath,createTask];
const putMiddleWare = [dataPath,updateTask];
const deleteMiddleware = [dataPath,deleteTask]

router.route("/").get(getMiddleware).post(postMiddleWare);
router.route("/:taskId").get(getByIdMiddleWare).delete(deleteMiddleware).put(putMiddleWare);

module.exports = router;