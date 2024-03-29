"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      action: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },
    {
      sequelize,
      modelName: "Log",
    },
  );
  return Log;
};
