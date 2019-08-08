const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const colors = require("colors");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const flash = require('connect-flash');
// const sendEmail = require('./models/sendEmail');

//twilio receive mgs starts
const http = require('http');
// const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
// const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body == 'Ready') {
    twiml.message('Your vehicle will be ready to pick up in 5 minutes. Please see us at the valet desk!');
  } else if (req.body.Body == 'ready') {
    twiml.message('Your vehicle will be ready to pick up in 5 minutes. Please see us at the valet desk!');
  } else {
    twiml.message(
      'Please only reply with either "Ready" or "ready" to get the response. Thanks!'
    );
  }

//   twiml.message('Your vehicle will be ready to pick up in 5 minutes. Please see us at the valet desk!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server for twilio is listening on port 1337');
});
//twilio receive mgs endss

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(flash())
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

function sendNotification(message) {
        sendEmail('asinghempire@gmail.com, asinghempire@yahoo.com', 'test  notification', message);
        console.log('Email sent');
    }


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Pro3_db_dev", { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log(`mongoose connection successful`.yellow);
    app.listen(PORT, (err)=> {
        if (err) throw err;
        console.log(`connected on port ${PORT}`.cyan)
    });
});



