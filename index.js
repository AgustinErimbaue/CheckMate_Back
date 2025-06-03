const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config");
const cors = require("cors");

app.use(express.json());
app.use(cors());

dbConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use("/user", require("./routes/user"));
app.use("/task", require("./routes/task"));

module.exports = app;