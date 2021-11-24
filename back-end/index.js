const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const db = require("./models");
const router = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

db.sequelize
  .sync
  // ( { force: true })
   ()
  .then(() => {
    const port = 8080;
    app.listen(port, () => console.log("App is running on port " + port));
  });
