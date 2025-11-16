const express = require("express")
const app = express()

app.use(express.json())

const taskRoutes = require("./routes/tasks")

app.use("/tasks", taskRoutes)

app.listen(3000, () => {
    console.log("Server is Listening !")
})