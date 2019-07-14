const express = require("express");
const bodyParser = require("body-parser");
const { countries, visits } = require("../db/fakeDb.js");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.send("Hello Worldx!");
});

app.get("/countries", (req, res) => {
  res.status(200).send({
    success: "true",
    countries
  });
});

app.get("/visits", (req, res) => {
  res.status(200).send({
    success: "true",
    visits
  });
});

app.post("/visits", (req, res) => {
  if (!req.body.visitor) {
    return res.status(400).send({
      success: "false",
      message: "visitor is required"
    });
  } else if (!req.body.country) {
    return res.status(400).send({
      success: "false",
      message: "country is required"
    });
  }

  const visit = {
    id: visits.length,
    country: req.body.country,
    visitor: req.body.visitor
  };

  visits.push(visit);

  return res.status(201).send({
    success: "true",
    message: "visit added successfully",
    visit
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
