"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContactTelephones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactTelephones.init(
    {
      contactId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Contact", key: "id" } },
      telephoneId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Telephone", key: "id" } },
    },
    {
      sequelize,
      modelName: "ContactTelephone",
    },
  );
  return ContactTelephones;
};
