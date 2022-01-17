const PORT = 8000;
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID =
  "368838655873-ssaut354d0fltik4lla2nkb8aorq5fan.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//049rF0fhq9gpzCgYIARAAGAQSNwF-L9IroMDEdszlml2Y7HbyrAiJrIWixeIgqSlLaS0dXUg5jDcurZWKqogjv9PUj4NLIxOC7kY";

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
        user: "automation@referral-factory.com",
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
      "<table style='font-family: arial, sans-serif; border-collapse: collapse; margin-top: 20px;'>" +
      "<tr>" +
      "<th style='border: 1px solid #dddddd; padding: 8px; text-align: left;'>Name</th>" +
      "<th style='border: 1px solid #dddddd; padding: 8px;  text-align: left;'>Number of rewards to be issued</th>" +
      "</tr>";

    var mailcontent_2 = list.map(
      (item) =>
        "<tr>" +
        "<td style='border: 1px solid #dddddd; padding: 8px; '>" +
        item.name +
        "</td>" +
        "<td style='border: 1px solid #dddddd; padding: 8px; '>" +
        item.q +
        "</td>" +
        "</tr>"
    );

    mailcontent_2 = mailcontent_2 + "";
    mailcontent_2 = mailcontent_2.replace(/,/g, "");

    var mailcontent_3 = "</table>";

    var count = list.reduce(
      (total, currentValue) => (total = total + currentValue.q),
      0
    );

    var current = new Date();
    var today = months[current.getMonth()];
    console.log(
      "count is:" + count + " and date is " + today + " => " + mailcontent_2
    );

    var htmlObject = "";
    if (count > 0) {
      htmlObject = `<div> Family Tax Review received a total of ${count} converted referrals for ${today}.
      The table below lists the people that need to be rewarded and how many rewards they needs to be issued. 
       ${mailcontent_1 + mailcontent_2 + mailcontent_3} </div>`;
    } else {
      htmlObject = `There were no converted referrals for ${today}. If you need help getting more referrals let us know. One of our experts will be happy to give you some advice.`;
    }

    const mailOptions = {
      from: "Brian <automation@referral-factory.com>",
      to: "iesteghlal@gmail.com",
      subject: "It's time to reward users! [Referral Factory]",
      text: `Hello Brian`,
      html: htmlObject,
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
