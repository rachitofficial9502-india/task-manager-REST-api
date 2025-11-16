const path = require("path")
const fs = require("fs")
const { nanoid } = require("nanoid")

const dataPath = path.join(process.cwd(), "data", "tasks.json")

function getAllTasks(req, res) {

    fs.readFile(dataPath, "utf-8", (err, data) => {
        
        if (err) {
            return res.status(200).send({
                "success" : true,
                "task" : []
            })
        }
        data = JSON.parse(data)
        res.status(200).send({
            "success" : true,
            "task" : data
        })
    })
}

function createTask(req, res) {

    const title = req.body.title

    const task = {
        id : nanoid(),
        title : title,
        completed : false,
        createdAt : Date.now()
    }


    fs.readFile(dataPath, "utf-8", (err, data) => {

        let tasks = []

        if (err) {
            tasks = []
        }
        else {
            tasks = JSON.parse(data)
        }
        tasks.push(task)

        fs.writeFile(dataPath, JSON.stringify(tasks, null, 2), () => {
            res.status(201).json({
                success : true,
                task : task
            })
        })

    })

}

function getTaskById(req, res) {
     
    const id = req.params.id


    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send("Error, File not found !")
        }
        data = JSON.parse(data)
        
        data = data.find(task => task.id === id)
        if (!data) {
            return res.status(404).json({
                success : false,
                message : "Task not found !"
            })
        }
        else {
            return res.status(200).json({
                success : true,
                task : data
            })
        }

    })
}

function updateTask(req, res) {

    const id = req.params.id
    const { title, completed } = req.body


    fs.readFile(dataPath, "utf-8", (err, data) => {

        if (err) {
            return res.status(404).send("Error, File not found !")
        }
        data = JSON.parse(data)
        const index = data.findIndex(task => task.id === id)
        if (index === -1) {
            return res.status(404).json({
                success : false,
                message : "Task not found !"
            })
        }
        if (title !== undefined) {
            data[index].title = title
        }
        if (completed !== undefined) {
            data[index].completed = completed
        }


        fs.writeFile(dataPath, JSON.stringify(data, null, 2), () => {
            return res.status(200).json({
                success : true,
                task : data[index]
            })
        })
    })

}

function deleteTask(req, res) {

    const id = req.params.id

    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send("Error, File not found !")
        }
        data = JSON.parse(data)
        const index = data.findIndex(task => task.id === id)
        if (index === -1) {
            return res.status(404).json({
                success : false,
                message : "Task not found !"
            })
        }
        const deletedTask = data.splice(index, 1)
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), () => {
            res.status(200).json({
                success : true,
                task : deletedTask[0]
            })
        })
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}