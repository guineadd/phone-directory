import express from "express";
import path from "path";
import http from "http";
// import https from "https";
import { Op, fn, col } from "sequelize";
// import { sequelize } from "../database/db.js";
import db from "../database/models/index.js";
import argon2 from "argon2";

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

const { Contact, Division, Telephone, ContactTelephone, UserType, User } = db;
const { sequelize } = db.sequelize;

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username }, include: UserType });

    if (user) {
      const validPassword = await argon2.verify(user.password, password);

      if (validPassword) {
        res.json(user);
      } else {
        res.status(400).json({ message: "Invalid username or password." });
      }
    } else {
      res.status(400).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    res.status(500).json(`Error logging in: ${error}`);
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const users = await User.findAll({ include: UserType });
    res.json(users);
  } catch (error) {
    res.status(500).json(`Error fetching users: ${error}`);
  }
});

app.post("/add-user", async (req, res) => {
  try {
    const { username, password, userTypeId } = req.body;

    const hashedPassword = await argon2.hash(password);

    await User.create({ userTypeId, username, password: hashedPassword });

    res.send(`User with username ${username} successfully added.`);
  } catch (error) {
    res.status(500).json(`Error adding user: ${error}`);
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    res.send("User successfully deleted.");
  } catch (error) {
    res.status(500).json(`Error deleting user: ${error}`);
  }
});

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
      attributes: [[fn("max", col("order")), "maxOrder"]],
    });

    let order;

    if (maxOrderDivision && maxOrderDivision.dataValues.maxOrder !== null) {
      order = maxOrderDivision.dataValues.maxOrder + 1;
    } else {
      order = 1;
    }

    await Division.create({ name, order });

    res.send(`Division with name ${name} successfully added.`);
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

app.put("/update-division-order", async (req, res) => {
  try {
    const divisionsToUpdate = req.body;

    const updates = divisionsToUpdate.map(async divisionData => {
      const { id, order } = divisionData;
      const division = await Division.findByPk(id);

      if (!division) {
        console.log(`Division with ID ${id} not found.`);
        return null;
      }

      division.order = order;

      return division.save();
    });

    await Promise.all(updates);

    res.send(`Divisions successfully updated.`);
  } catch (error) {
    res.status(500).json(`Error updating divisions: ${error}`);
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

app.post("/get-contact/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOne({
      where: { id },
      include: [
        {
          model: Telephone,
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json(`Error fetching contact: ${error}`);
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

    const conditions = words.map(word => ({
      [Op.or]: [
        { firstName: { [Op.like]: `%${word}%` } },
        { lastName: { [Op.like]: `%${word}%` } },
        { "$Division.name$": { [Op.like]: `%${word}%` } },
        { "$Telephones.tel$": { [Op.like]: `%${word}%` } },
      ],
    }));

    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [conditions],
      },
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

    const results = await Promise.all(
      contacts.map(async contact => {
        const telephones = await contact.getTelephones();
        return { ...contact.dataValues, Telephones: telephones };
      }),
    );

    res.json(results);
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
    const { contactId, divisionId, firstName, lastName, comment, telephones } = req.body;

    console.log("Division ID: ", divisionId);

    const contact = await Contact.findByPk(contactId);

    await contact.update({ divisionId, firstName, lastName, comment });

    const promises = telephones.map(async tel => {
      let telephone = await Telephone.findOne({ where: { tel } });

      if (!telephone) {
        telephone = await Telephone.create({ tel });
      }

      return telephone;
    });

    const updatedTelephones = await Promise.all(promises);
    const currentTelephones = await contact.getTelephones();

    await contact.removeTelephones(currentTelephones);

    await Promise.all(
      currentTelephones.map(async currentTelephone => {
        console.log("Current telephone: ", currentTelephone.dataValues.id);
        // updatedTelephones.map(t => t.dataValues.id);
        console.log(
          "Updated telephones: ",
          updatedTelephones.map(t => t.dataValues.id),
        );
        if (updatedTelephones.map(t => t.dataValues.id).includes(currentTelephone.dataValues.id)) {
          console.log("YES");
          return;
        }

        await Telephone.destroy({ where: { id: currentTelephone.id } });
      }),
    );

    // console.log("Current telephones: ", currentTelephones);
    // console.log("Updated telephones: ", updatedTelephones);

    await Promise.all(
      updatedTelephones.map(async updatedTelephone =>
        contact.addTelephone(updatedTelephone, { through: { contactId, telephoneId: updatedTelephone.id } }),
      ),
    );
    // await contact.addTelephones(updatedTelephones, { through: { contactId, telephoneId: updatedTelephones.map(t => t.id) } });

    res.send(`Contact with name ${firstName} ${lastName} successfully updated.`);
  } catch (error) {
    res.status(500).json(`Error updating contact: ${error}`);
  }
});

app.delete("/delete-contact", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    await ContactTelephone.destroy({ where: { contactId: id } });
    await Contact.destroy({ where: { id } });

    res.send("Contact and associated telephones successfully deleted.");
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
