const bodyParser = require("body-parser");
const { countries, visits } = require("../../db/fakeDb.js");
const service = require("../services/service.js");

const setup = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  registerEndpoints(app);
};

const registerEndpoints = app => {
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

  // Visits for visitor
  app.get("/visits:visitorId", (req, res) => {
    const id = parseInt(req.params.visitorId, 10);
    const visitsForVisitor = service.visitsForVisitor(visits, id);

    if (!visitsForVisitor || visitsForVisitor.length === 0) {
      return res.status(404).send({
        success: "false",
        message: `visits for visitor ${id} do not exist`
      });
    }
    return res.status(200).send({
      success: "true",
      message: `visits for visitor ${id} retrieved successfully`,
      visits: visitsForVisitor
    });
  });
};

module.exports = { setup };
