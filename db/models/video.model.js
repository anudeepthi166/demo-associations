//creating video Model

//import sequelize
const { sequelize } = require("../db.config");
const { DataTypes } = require("sequelize");

//creating model
exports.Videos = sequelize.define(
  "videos",
  {
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    video_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    //freezeTableName: true,
  }
);
