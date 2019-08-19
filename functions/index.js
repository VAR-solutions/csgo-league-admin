const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();
require('dotenv').config()


/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.VUE_APP_MAIL,
        pass: process.env.VUE_APP_PASS
    }
});
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;
        const team = req.query.team;
        const credit = req.query.credit;

        const mailOptions = {
            from: 'Admin-Arcadia <arcadia.iiitv@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Auction CS:GO League', // email subject
            html: `<p style="font-size: 16px;">Congratulations, have been bought by <b>${team}</b> for ${credit} credits.</p>
            <footer>For any queries contact us:<br>Ravi Varshney<br><a href="tel:+91-7599322051">+91-7599322051</a></footer>` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
