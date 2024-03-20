import { Sequelize } from "sequelize";
import contactsModel from "./models/contacts.js";
import divisionsModel from "./models/divisions.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/catalog.sqlite",
});

const Divisions = divisionsModel(sequelize);
const Contacts = contactsModel(sequelize);

Divisions.hasMany(Contacts, { sourceKey: "id", foreignKey: "divisionId" });
Contacts.belongsTo(Divisions, { foreignKey: "divisionId", targetKey: "id" });

export { sequelize, Divisions, Contacts };
