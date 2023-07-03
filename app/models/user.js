const db = require("../config/db");

class UserModel {
  static async getUsers() {
    return new Promise((resolve) => {
      db.query("SELECT * FROM users", [], (error, result) => {
        if (!error) {
          resolve(result);
        }
      });
    });
  }

  static async getUser(id) {
    return new Promise((resolve) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, result) => {
        if (!error) {
          resolve(result);
        }
      });
    });
  }

  static async addUser(username, password, avatar, typeSub) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO users (username, password, avatar, typeSub) VALUES(?,?,?,?)",
        [username, password, avatar, typeSub],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  static async updateUser(id, username, password, avatar, typeSub) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE users SET username = ?, password = ?, avatar = ?, typeSub = ?, WHERE id = ?",
        [username, password, avatar, typeSub, id],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  static async deleteUser(id) {
    return new Promise((resolve) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
        if (!error) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

module.exports = UserModel;
