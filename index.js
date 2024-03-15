const express = require("express");
const app = express();
const host = 3000;
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/DivineCuts");
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected...");
});

const User = mongoose.model("User", {
  name: String,
  mail: String,
  contact: Number,
  pwd: String,
});

const Appointment = mongoose.model("Appointment", {
  name: String,
  service: String,
  date: Date,
  time: String,
});

app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ mail: req.body.mail });

    if (existingUser) {
      return res.status(409).json({
        msg: "user with mail already exists",
      });
    }

    const newUser = new User({
      name: req.body.name,
      mail: req.body.mail,
      contact: req.body.contact,
      pwd: req.body.pwd,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail, pwd: req.body.pwd });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }

    res.json({
      msg: "Login Successful",
      user: user,
    });
  } catch (error) {
    res.json(error);
  }
});

app.post("/book-appointment", async (req, res) => {
  try {
    const existingAppointment = await Appointment.findOne({
      date: req.body.date,
      time: req.body.time,
    });

    if (existingAppointment) {
      return res.status(409).json({
        msg: "Time slot not available",
      });
    }

    const newAppointment = new Appointment({
      name: req.body.name,
      email: req.body.email,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.json(error);
  }
});

app.get("/view-appointment/:name", async (req, res) => {
  try {
    const bookedUser = await Appointment.findOne({ name: req.params.name });

    if (bookedUser) {
      return res.json(bookedUser);
    }

    return res.status(404).json({ msg: "No appointment found" });
  } catch (error) {
    res.json(error);
  }
});

app.delete("/delete-appointment/:name", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findOneAndDelete({
      name: req.params.name,
    });

    if (deletedAppointment) {
      return res.json({ msg: "Appointment deleted" });
    }

    return res.status(404).json({ msg: "No appointment found" });
  } catch (error) {
    res.json(error);
  }
});

app.listen(host, () => {
  console.log("Server Started...");
});
