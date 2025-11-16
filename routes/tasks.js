const express = require("express")
const router = express.Router()

const {

    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask

} = require("../controllers/tasksController")

router.get("/", getAllTasks)
router.post("/", createTask)
router.get("/:id", getTaskById)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router
