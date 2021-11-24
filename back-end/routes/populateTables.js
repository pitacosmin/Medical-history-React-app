const express = require("express");
const router = express.Router();

const populateTablesController = require("../controllers").populateTables;

// GET
router.get("/populateTables", populateTablesController.populateTables);

module.exports = router;
