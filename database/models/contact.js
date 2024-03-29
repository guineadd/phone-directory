"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Contact.belongsTo(models.Department, { foreignKey: "departmentId", targetKey: "id" });
      Contact.belongsTo(models.Department, { foreignKey: "departmentId" });
      Contact.belongsToMany(models.Telephone, { through: "ContactTelephone" });
    }
  }
  Contact.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      departmentId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Department", key: "id" } },
      firstName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      lastName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      comment: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    },
    {
      sequelize,
      modelName: "Contact",
    },
  );
  return Contact;
};
