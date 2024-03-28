"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserType.hasMany(models.User, { foreignKey: "userTypeId" });
    }
  }
  UserType.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },
    {
      sequelize,
      modelName: "UserType",
    },
  );
  return UserType;
};
