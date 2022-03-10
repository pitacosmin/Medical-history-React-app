const express = require("express");
const router = express.Router();

const fiseMedicaleController = require("../controllers").fiseMedicale;

// GET
router.get("/getFiseMedicaleAndAnimal", fiseMedicaleController.getFiseMedicaleAndAnimal);
router.get("/getFiseMedicaleByVaccin", fiseMedicaleController.getFiseMedicaleByVaccin);

module.exports = router;
