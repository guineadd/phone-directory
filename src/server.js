import express from "express";
import path from "path";
import http from "http";
// import https from "https";
import { Op } from "sequelize";
import { sequelize } from "../database/db.js";
import { Divisions } from "../database/db.js";
import { Contacts } from "../database/db.js";

const app = express();
app.use(express.static("public"));
app.use("/assets/webfonts", express.static("../assets/webfonts"));
app.use("/assets", express.static("assets"));
app.use("/webfonts", express.static(path.join(path.resolve(), "node_modules", "@fortawesome/fontawesome-free/webfonts")));

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/favicon.ico"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/public/index.html"));
});

app.get("/get-divisions", async (req, res) => {
  try {
    const divisions = await Divisions.findAll();
    res.json(divisions);
  } catch (error) {
    res.status(500).json(`Error fetching divisions: ${error}`);
  }
});

// search divisions as a single input (search by name in a clickable label fashion)
app.post("/search-divisions", async (req, res) => {
  try {
    const { query } = req.body;

    const filter = { name: { [Op.like]: `%${query}%` } };

    const divisions = await Divisions.findAll({ where: filter });

    res.json(divisions);
  } catch (error) {
    res.status(500).json(`Error finding division: ${error}`);
  }
});

app.post("/add-division", async (req, res) => {
  try {
    const { name } = req.body;

    const maxOrderDivision = await Divisions.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("order")), "maxOrder"]],
    });

    let order;

    if (maxOrderDivision && maxOrderDivision.maxOrder !== null) {
      order = maxOrderDivision.maxOrder + 1;
    } else {
      order = 1;
    }

    const newDivision = await Divisions.create({ name, order });

    res.json(newDivision);
  } catch (error) {
    res.status(500).json(`Error adding division: ${error}`);
  }
});

app.put("/update-division", async (req, res) => {
  try {
    const { id, name, order } = req.body;

    const updatedDivision = await Divisions.update({ name, order }, { where: { id } });

    res.json(updatedDivision);
  } catch (error) {
    res.status(500).json(`Error updating division: ${error}`);
  }
});

app.delete("/delete-division", async (req, res) => {
  try {
    const { id } = req.body;

    const deletedDivision = await Divisions.destroy({ where: { id } });

    res.json(deletedDivision);
  } catch (error) {
    res.status(500).json(`Error deleting division: ${error}`);
  }
});

app.post("/get-contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const division = await Divisions.findOne({ where: { id } });
    const contacts = await Contacts.findAll({ where: { divisionId: id } });
    res.json({ division, contacts });
  } catch (error) {
    res.status(500).json(`Error fetching contacts: ${error}`);
  }
});

// search contacts per user input (search by first name or last name)
app.post("/search-contacts", async (req, res) => {
  try {
    const { query } = req.body;

    const filter = {
      [Op.or]: [{ firstName: { [Op.like]: `%${query}%` } }, { lastName: { [Op.like]: `%${query}%` } }],
    };

    const contacts = await Contacts.findAll({ where: filter });
    res.json(contacts);
  } catch (error) {
    res.status(500).json(`Error finding contact: ${error}`);
  }
});

app.post("/add-contact", async (req, res) => {
  try {
    const { divisionName, firstName, lastName, comment, primaryTel, secondaryTel } = req.body;

    const division = await Divisions.findOne({ where: { name: divisionName } });

    const divisionId = division.id;

    const newContact = await Contacts.create({
      divisionId,
      firstName,
      lastName,
      comment,
      primaryTel,
      secondaryTel,
    });

    res.json(newContact);
  } catch (error) {
    res.status(500).json(`Error adding contact: ${error}`);
  }
});

app.put("/update-contact", async (req, res) => {
  try {
    const { id, divisionName, firstName, lastName, comment, primaryTel, secondaryTel } = req.body;

    const division = await Divisions.findOne({ where: { name: divisionName } });

    const divisionId = division.id;

    const updatedContact = await Contacts.update(
      {
        divisionId,
        firstName,
        lastName,
        comment,
        primaryTel,
        secondaryTel,
      },
      { where: { id } },
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json(`Error updating contact: ${error}`);
  }
});

app.delete("/delete-contact", async (req, res) => {
  try {
    const { id } = req.body;

    const deletedContact = await Contacts.destroy({ where: { id } });

    res.json(deletedContact);
  } catch (error) {
    res.status(500).json(`Error deleting contact: ${error}`);
  }
});

const port = process.env.PORT;
const host = process.env.HOST;

// const server = https.createServer(credentials, app);
const server = http.createServer(app);

server.listen(port, host, () => {
  console.log("listening at http://%s:%s", host, port);
});
