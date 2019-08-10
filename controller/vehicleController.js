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
  to: ["ezvalet2019@gmail.com"],
  subject: "EZ Valet- A new vahicle has been register!",
  text: "admin1 has succussfully register a new vahicle. "
};

//Twilio code to send text starts
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);


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
      //twilio create message starts
        client.messages
        .create({
        body: 'Thank you for parking your vehicle with us. Your e-ticket # is EZ-765213. You would need this e-ticket # when you are ready to pick your vehicle back. You can simply reply "Ready" to this message and will have your car ready to pickup in 5 minutes.',
        from: '+19546459875',
        mediaUrl: ['https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png'],
        to: '+19547930688'//amit
        //to: '+17867680524'//Julio
        //to: '+12096249203'//Orlando
        //to: '+17542186810'//Rafael
        //to: '+17862349591'//Omar
      })
      .then(message => console.log("twilio message sent"+message.sid));
      console.log('Email message sent: ' + info.response);
      //twilio create message ends
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