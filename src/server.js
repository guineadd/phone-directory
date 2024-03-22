import express from "express";
import path from "path";
import http from "http";
// import https from "https";
import { Op } from "sequelize";
// import { sequelize } from "../database/db.js";
import db from "../database/models/index.js";

const app = express();
app.use(express.json());
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

const { Contact, Division, Telephone } = db;
const { sequelize } = db.sequelize;

app.get("/get-divisions", async (req, res) => {
  try {
    const divisions = await Division.findAll();
    res.json(divisions);
  } catch (error) {
    res.status(500).json(`Error fetching divisions: ${error}`);
  }
});

app.post("/get-division/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const division = await Division.findOne({ where: { id } });
    res.json(division.dataValues);
  } catch (error) {
    res.status(500).json(`Error fetching division: ${error}`);
  }
});

// search divisions as a single input (search by name in a clickable label fashion)
app.post("/search-divisions", async (req, res) => {
  try {
    const { query } = req.body;

    const filter = { name: { [Op.like]: `%${query}%` } };

    const divisions = await Division.findAll({ where: filter });

    res.json(divisions);
  } catch (error) {
    res.status(500).json(`Error finding division: ${error}`);
  }
});

app.post("/add-division", async (req, res) => {
  try {
    const { name } = req.body;

    const maxOrderDivision = await Division.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("order")), "maxOrder"]],
    });

    let order;

    if (maxOrderDivision && maxOrderDivision.maxOrder !== null) {
      order = maxOrderDivision.maxOrder + 1;
    } else {
      order = 1;
    }

    const newDivision = await Division.create({ name, order });

    res.json(newDivision);
  } catch (error) {
    res.status(500).json(`Error adding division: ${error}`);
  }
});

app.put("/update-division", async (req, res) => {
  try {
    const { id, name, order } = req.body;

    await Division.update({ name, order }, { where: { id } });

    res.send(`Division with name ${name} successfully updated.`);
  } catch (error) {
    res.status(500).json(`Error updating division: ${error}`);
  }
});

app.delete("/delete-division/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contacts = await Contact.findAll({ where: { divisionId: id } });

    if (contacts.length > 0) {
      const test = await Contact.update({ divisionId: 1 }, { where: { divisionId: id } });
      console.log(test);
    }

    const deletedDivision = await Division.findOne({ where: { id } });
    await Division.destroy({ where: { id } });

    res.send(`Division with name ${deletedDivision.dataValues.name} deleted.`);
  } catch (error) {
    res.status(500).json(`Error deleting division: ${error}`);
  }
});

app.get("/get-all-contacts", async (req, res) => {
  try {
    const contacts = await Division.findAll({
      include: [
        {
          model: Contact,
          include: [
            {
              model: Telephone,
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json(`Error fetching contacts: ${error}`);
  }
});

app.post("/get-contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const division = await Division.findOne({ where: { id } });
    const contacts = await Contact.findAll({
      where: { divisionId: id },
      include: [
        {
          model: Telephone,
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json({ division, contacts });
  } catch (error) {
    res.status(500).json(`Error fetching contacts: ${error}`);
  }
});

// search contacts per user input (search by first name or last name)
app.post("/search-contacts", async (req, res) => {
  try {
    const { query } = req.body;
    const words = query.split(" ");

    const wordConditions = words.map(word => ({
      [Op.or]: [
        { firstName: { [Op.like]: `%${word}%` } },
        { lastName: { [Op.like]: `%${word}%` } },
        { "$Division.name$": { [Op.like]: `%${word}%` } },
        { "$Telephones.tel$": { [Op.like]: `%${word}%` } },
      ],
    }));

    const filter = {
      [Op.and]: [wordConditions],
    };

    const contacts = await Contact.findAll({
      where: filter,
      include: [
        {
          model: Division,
          as: "Division",
        },
        {
          model: Telephone,
          as: "Telephones",
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json(`Error finding contact: ${error}`);
  }
});

app.post("/add-contact", async (req, res) => {
  try {
    const { divisionId, firstName, lastName, comment, telephones } = req.body;

    // create and save the new Contact instance
    const newContact = await Contact.create({
      divisionId: Number(divisionId), // divisionId is a string coming for a DOM element's id attribute
      firstName,
      lastName,
      comment,
    });

    // create the new Telephone instances
    const newTelephones = await Promise.all(
      telephones.map(async telephone => {
        const newTelephone = await Telephone.create({ tel: telephone });
        return newTelephone;
      }),
    );

    // associate the new Telephone instances with the new Contact instance through the ContactTelephones join table
    await Promise.all(
      newTelephones.map(async newTelephone => {
        await newContact.addTelephone(newTelephone, { through: { contactId: newContact.id, telephoneId: newTelephone.id } });
      }),
    );

    res.send(`Contact with name ${firstName} ${lastName} successfully added.`);
  } catch (error) {
    res.status(500).json(`Error adding contact: ${error}`);
  }
});

app.put("/update-contact", async (req, res) => {
  try {
    const { id, divisionName, firstName, lastName, comment, primaryTel, secondaryTel } = req.body;

    const division = await Division.findOne({ where: { name: divisionName } });

    const divisionId = division.id;

    const updatedContact = await Contact.update(
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

    const deletedContact = await Contact.destroy({ where: { id } });

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
