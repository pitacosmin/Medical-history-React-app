const express = require("express");
const router = express.Router();

const populateTablesController = require("../controllers").populateTables;

router.get("/populateTables", populateTablesController.populateTables);

module.exports = router;