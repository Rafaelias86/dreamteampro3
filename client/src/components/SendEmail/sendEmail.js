/* eslint-disable no-undef */
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypt = require('../../../../models/crypt');
const emailDB = require("../../../../models/Users");
// const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
var emailList = [];

function pullEmails() {
    emailList.push(emailDB.findmany({ users: (email) }))
}
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});
function sendEmail() {
    pullEmails();
    const mailOptions = {
        from: 'ezvalet2019@gmail.com',
        to: emailList,
        subject: "EZ Valet- A new vahicle has been register!",
        text: "admin1 has succussfully register a new vahicle. "
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
};

export default sendEmail;
