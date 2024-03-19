import { DataTypes } from "sequelize";

export default function contactsModel(sequelize) {
  const Contacts = sequelize.define("Contacts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    divisionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Divisions",
        key: "id",
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    primaryTel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    secondaryTel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });

  return Contacts;
}
