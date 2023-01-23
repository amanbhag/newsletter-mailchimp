const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/newindex.html`);
});
app.post("/", function (req, res) {
  let firsrtname = req.body.firsrtname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let userData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firsrtname,
          LNAME: lastname,
        },
      },
    ],
  };
  let jsondata = JSON.stringify(userData);
  let url = "https://us21.api.mailchimp.com/3.0/lists/a280504aff";
  const options = {
    method: "POST",
    auth: "umesh:54080389305efb54588feadf93e0ce1d-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
    console.log(response.statusCode);
    console.log(response.statusCode);
    response.on("data", function (data) {
      // console.log(JSON.parse(data));
    });
  });

  request.write(jsondata);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//api key 54080389305efb54588feadf93e0ce1d-us21
//list id a280504aff
