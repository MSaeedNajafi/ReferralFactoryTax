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
  "1//047zG-9Zr5AX6CgYIARAAGAQSNwF-L9Ir9TNlTHv-pah_DCT8AyIaR10BUxJJ3hA8QtZfkODMj5T-jA2nSD3UXYrXBVNb8T-YdHY";

//give reward
app.post("/sendemail", async (req, res) => {
  try {
    const { list } = req.body;

    console.log("list ==> ", list);

    await sendAutoMail(list)
      .then((result) => console.log("Sending Automatic Email...", result))
      .catch((error) => console.log(error.message));

    res.status(200).json({ list });
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

async function sendAutoMail(list) {
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

    const months = [
      "January",
      "February ",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var mailcontent_1 =
      "<table style='font-family: arial, sans-serif; border-collapse: collapse;width: 100%; margin-top: 20px;'>" +
      "<tr>" +
      "<th style='border: 1px solid #dddddd; padding: 8px; width: 50% ;'>Name </th>" +
      "<th style='border: 1px solid #dddddd; padding: 8px; width: 50% ;'>Qualified </th>" +
      "</tr>";

    var mailcontent_2 = list.map(
      (item) =>
        "<tr>" +
        "<td style='border: 1px solid #dddddd; padding: 8px; width: 50% ;'>" +
        item.name +
        "</td>" +
        "<td style='border: 1px solid #dddddd; padding: 8px; width: 50% ;'>" +
        item.q +
        "</td>" +
        "</tr>"
    );

    var mailcontent_3 = "</table>";

    var count = list.reduce(
      (total, currentValue) => (total = total + currentValue.q),
      0
    );

    var current = new Date();
    console.log(
      "count is:" + count + " and date is " + months[current.getMonth()]
    );

    const mailOptions = {
      from: "Saeed <najafisaeed@gmail.com>",
      to: "iesteghlal@gmail.com",
      subject: "It's time to reward users! [Referral Factory]",
      text: `Hello Brian`,
      html: `<div> Family Tax Review received a total of ${count} converted referrals for ${
        months[current.getMonth()]
      } \n.
      The table below contains the details of who needs to be issued with a reward and how many rewards they needs to be paid out. 
       ${mailcontent_1 + mailcontent_2 + mailcontent_3} </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.listen(PORT, () => console.log("server running on potr " + PORT));

// list.map(
//   (li) =>
//     `<div
//     style={
//       display = flex;
//       justify-Content =space-between;
//     }
//   >
//     <p>${li.name}</p>
//     <p>${li.q}</p>
//   </div>`
// )
