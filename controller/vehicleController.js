const db = require("../models");
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: "SCKitchen1864@gmail.com",
    pass: "duwomen24",
  },
});

const mailOptions = {
  from: '"Second Chance Kitchen" <SCKitchen1864@gmail.com>',
  to: ["sbarenz@mac.com", "SCKitchen1864@yahoo.com", "nancyeb27@yahoo.com"],
  subject: "SC Kitchen has a new listing!",
  text: "Please come visit our website to see the new offering! Thanks much, SC Kitchen"
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
    console.log("here's the create stuff")
    // pullEmails();
    transport.sendMail(mailOptions, function (error, info) {
      console.log("this is the transport business#1")
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