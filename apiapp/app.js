const express = require("express");
const api = require("./api/api.js");

const app = express();
const PORT = 5000;

api.setup(app);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
