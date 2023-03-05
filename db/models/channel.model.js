//creating Channel Model

//import sequelize
const { sequelize } = require("../db.config");
const { DataTypes } = require("sequelize");

//creating model
exports.Channel = sequelize.define(
  "channel",
  {
    channel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
