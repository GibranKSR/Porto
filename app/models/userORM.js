const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "4893",
  database: "porto",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const UserORM = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  typeSub: {
    type: DataTypes.INTEGER,
  },
});

module.exports = UserORM;
