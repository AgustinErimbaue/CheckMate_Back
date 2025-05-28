const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");
const TaskController = require("./controllers/TaskController");

app.use(express.json());

dbConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use("/task",require("./routes/task"));
