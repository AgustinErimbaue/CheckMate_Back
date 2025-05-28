const User = require("../models/User");

const UserController = {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

     
      const { password, ...userWithoutPassword } = user.toObject();

      res.status(201).send({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({
        message: "Error creating user",
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
