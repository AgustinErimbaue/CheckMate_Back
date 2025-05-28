const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Error connecting to MongoDB: " + error.message);
  }
};

module.exports = {
  dbConnection,
};
