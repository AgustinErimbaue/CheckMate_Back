const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
    }
  },

  async loginUser(req,res) {
     try {
        const user = await User.findOne({
            email: req.body.email,
        })
      const token = jwt.sign({ _id: user._id }, jwt_secret);
        if (user.tokens.length > 4) user.tokens.shift();
        user.tokens.push(token);
        await user.save();
        res.send({ message: 'Bienvenid@ ' + user.username, token });
    } catch (error) {
        console.error(error);
    }
},

};

module.exports = UserController;
