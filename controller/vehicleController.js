require('dotenv').config();
const db = require("../models");
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});

const mailOptions = {
  from: '"EZ Valet" <ezvalet2019@gmail.com>',
  to: ["asinghempire@gmail.com", "ezvalet2019@gmail.com"],
  subject: "EZ Valet- A new vahicle has been register!",
  text: "admin1 has succussfully register a new vahicle. "
};
// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Vehicle
      .find(req.query)
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Vehicle
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("here's the create function")
    // pullEmails();
    transport.sendMail(mailOptions, function (error, info) {
      console.log("transport is sending Mail.")
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    db.Vehicle
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Vehicle
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Vehicle
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};