const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");
const bcrypt = require("bcryptjs");

const UserController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      res.status(201).send({ message: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error("Error creando usuario:", error);
      res.status(500).send({ message: "Error creando usuario", error: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();

      res.send({ message: `Bienvenid@ ${user.username}`, token });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).send({ message: "Error al iniciar sesión", error: error.message });
    }
  },

  async logoutUser(req, res) {
     try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
};

module.exports = UserController;
