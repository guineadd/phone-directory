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

const { Contact, Department, Telephone, ContactTelephone, UserType, User, Log } = db;
const { sequelize } = db;

app.get("/latest-timestamp", async (req, res) => {
  try {
    const models = Object.keys(sequelize.models);

    // const latestTimestamp = {};
    let latestTimestamp;

    await Promise.all(
      models.map(async modelName => {
        const model = db[modelName];
        const latestRecord = await model.findOne({
          order: [["updatedAt", "DESC"]],
        });

        const formatDate = timestamp => {
          const date = new Date(timestamp);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        if (latestRecord) {
          const latestUpdatedAt = new Date(latestRecord.updatedAt).getTime();

          if (!latestTimestamp || latestUpdatedAt > latestTimestamp) {
            latestTimestamp = formatDate(latestUpdatedAt);
          }
        }
      }),
    );

    res.json(latestTimestamp);
  } catch (error) {
    res.status(500).json(`Error fetching latest timestamp: ${error}`);
  }
});

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

app.post("/add-log", async (req, res) => {
  try {
    const { username, action, description } = req.body;

    await Log.create({ username, action, description });

    res.send("Log successfully added.");
  } catch (error) {
    res.status(500).json(`Error adding log: ${error}`);
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

app.get("/get-departments", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json(`Error fetching departments: ${error}`);
  }
});

app.post("/get-department/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({ where: { id } });
    res.json(department.dataValues);
  } catch (error) {
    res.status(500).json(`Error fetching department: ${error}`);
  }
});

// search departments as a single input (search by name in a clickable label fashion)
app.post("/search-departments", async (req, res) => {
  try {
    const { query } = req.body;

    const filter = { name: { [Op.like]: `%${query}%` } };

    const departments = await Department.findAll({ where: filter });

    res.json(departments);
  } catch (error) {
    res.status(500).json(`Error finding department: ${error}`);
  }
});

app.post("/add-department", async (req, res) => {
  try {
    const { name } = req.body;

    const maxOrderDepartment = await Department.findOne({
      attributes: [[fn("max", col("order")), "maxOrder"]],
    });

    let order;

    if (maxOrderDepartment && maxOrderDepartment.dataValues.maxOrder !== null) {
      order = maxOrderDepartment.dataValues.maxOrder + 1;
    } else {
      order = 1;
    }

    await Department.create({ name, order });

    res.send(`Department with name ${name} successfully added.`);
  } catch (error) {
    res.status(500).json(`Error adding department: ${error}`);
  }
});

app.put("/update-department", async (req, res) => {
  try {
    const { id, name, order } = req.body;

    await Department.update({ name, order }, { where: { id } });

    res.send(`Department with name ${name} successfully updated.`);
  } catch (error) {
    res.status(500).json(`Error updating department: ${error}`);
  }
});

app.put("/update-department-order", async (req, res) => {
  try {
    const departmentsToUpdate = req.body;

    const updates = departmentsToUpdate.map(async departmentData => {
      const { id, order } = departmentData;
      const department = await Department.findByPk(id);

      if (!department) {
        console.log(`Department with ID ${id} not found.`);
        return null;
      }

      department.order = order;

      return department.save();
    });

    await Promise.all(updates);

    res.send(`Departments successfully updated.`);
  } catch (error) {
    res.status(500).json(`Error updating departments: ${error}`);
  }
});

app.delete("/delete-department/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contacts = await Contact.findAll({ where: { departmentId: id } });

    if (contacts.length > 0) {
      const test = await Contact.update({ departmentId: 1 }, { where: { departmentId: id } });
      console.log(test);
    }

    const deletedDepartment = await Department.findOne({ where: { id } });
    await Department.destroy({ where: { id } });

    res.send(`Department with name ${deletedDepartment.dataValues.name} deleted.`);
  } catch (error) {
    res.status(500).json(`Error deleting department: ${error}`);
  }
});

app.get("/get-all-contacts", async (req, res) => {
  try {
    const contacts = await Department.findAll({
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

    const department = await Department.findOne({ where: { id } });
    const contacts = await Contact.findAll({
      where: { departmentId: id },
      include: [
        {
          model: Telephone,
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json({ department, contacts });
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
        { "$Department.name$": { [Op.like]: `%${word}%` } },
        { "$Telephones.tel$": { [Op.like]: `%${word}%` } },
      ],
    }));

    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [conditions],
      },
      include: [
        {
          model: Department,
          as: "Department",
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
    const { departmentId, firstName, lastName, comment, telephones } = req.body;

    // create and save the new Contact instance
    const newContact = await Contact.create({
      departmentId: Number(departmentId), // departmentId is a string coming for a DOM element's id attribute
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
    const { contactId, departmentId, firstName, lastName, comment, telephones } = req.body;

    const contact = await Contact.findByPk(contactId);

    await contact.update({ departmentId, firstName, lastName, comment });

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
