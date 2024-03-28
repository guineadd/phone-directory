"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserType, { foreignKey: "userTypeId" });
    }
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userTypeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "UserType", key: "id" } },
      username: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      password: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
