const { check, validationResult } = require("express-validator");
const userModel = require("../models/user");
const userModelORM = require("../models/userORM");

const validationRules = [
  check("username").notEmpty().withMessage("Username required"),
  check("password").notEmpty().withMessage("Password required"),
  check("avatar").notEmpty().withMessage("Avatar required"),
  check("typeSub").notEmpty().withMessage("Type required"),
];

class UsersController {
  static async getAllUsers(req, res) {
    let results = await userModelORM.findAll();

    if (results) {
      res.render("users", { users: results });
    }
  }

  static async getUser(req, res) {
    let id = req.params.id;
    let results = await userModelORM.findByPk(id);

    if (results) {
      res.render("register", { users: results });
    }
  }

  static async addUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let result = await userModelORM.create({
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar,
        typeSub: req.body.typeSub,
      });
      if (result) {
        res.redirect("/users");
      } else {
        res.send("Add user failed");
      }
    }
  }

  static async updateUser(req, res) {
    let id = req.params.id;
    let result = await userModelORM.findByPk(id);

    result.set({
      username: req.body.username,
      password: req.body.password,
      avatar: req.body.avatar,
      typeSub: req.body.typeSub,
    });

    result.save();

    if (result) {
      res.redirect("/users");
    } else {
      res.send("Can't update the user");
    }
  }

  static async deleteUser(req, res) {
    let id = req.params.id;
    let result = await userModelORM.findByPk(id);

    result.destroy();

    if (id) {
      result = await userModel.deleteUser(id);
    }

    res.status(200).send("OK");
  }
}

module.exports = {
  validationRules,
  UsersController,
};
