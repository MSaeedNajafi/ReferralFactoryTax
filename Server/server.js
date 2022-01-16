const PORT = 8000;
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID =
  "865751831961-dojct3tfnf2nn404nvq02qpgevdjie8d.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//049SqVHW99CewCgYIARAAGAQSNwF-L9IrdJ4-vKTcEAE3jaRN1e2u1PKdZ2LDghaIxyhEsUtZ3QuAmLQ2SMcSdh7qhKtOUal08pE";

//give reward
app.post("/sendreward", async (req, res) => {
  try {
    const { emailTo } = req.body;

    console.log("send reward to ", emailTo);

    await sendMailReward(emailTo)
      .then((result) => console.log("Email rewards sent...", result))
      .catch((error) => console.log(error.message));

    res.status(200).json({ emailTo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//sign up
app.post("/signup", async (req, res) => {
  try {
    const { newUserNameEmail, url } = req.body;

    console.log(newUserNameEmail, url);

    await sendMail(newUserNameEmail, url)
      .then((result) => console.log("Email sent...", result))
      .catch((error) => console.log(error.message));

    res.status(200).json({ newUserNameEmail, url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(newUserNameEmail, url) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "najafisaeed@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Saeed <najafisaeed@gmail.com>",
      to: "iesteghlal@gmail.com",
      // to: `${newUserNameEmail}`,
      subject: "Hello from gmail using API",
      text: `${url} and this ${newUserNameEmail}`,
      html: `<h1>Email from: ${newUserNameEmail}</h1><br><p>this link: ${url}</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendMailReward(newUserNameEmail) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "najafisaeed@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Saeed <najafisaeed@gmail.com>",
      to: "iesteghlal@gmail.com",
      // to: `${newUserNameEmail}`,
      subject: "Your are getting a reward!",
      text: `hellos ${newUserNameEmail}`,
      html: `<h1>Hello ${newUserNameEmail}</h1><br><p>You are getting a reward!</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.listen(PORT, () => console.log("server running on potr " + PORT));
