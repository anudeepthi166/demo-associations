//creating Owner Model

//import sequelize
const { sequelize } = require("../db.config");
const { DataTypes } = require("sequelize");

//creating model
exports.Owner = sequelize.define(
  "owner",
  {
    owner_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
