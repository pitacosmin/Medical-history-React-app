const express = require("express");
const router = express.Router();

const populateTablesRouter = require("./populateTables");
const proprietariRouter = require("./proprietari");
const animaleRouter = require("./animale");
const fiseMedicaleRouter = require("./fiseMedicale");
const mediciRouter = require("./medici");
const serviciiRouter = require("./servicii");
const consultatiiRouter = require("./consultatii");
const mediciXserviciiRouter = require("./mediciXservicii");

router.use("/", populateTablesRouter);
router.use("/", proprietariRouter);
router.use("/", animaleRouter);
router.use("/", fiseMedicaleRouter);
router.use("/", mediciRouter);
router.use("/", serviciiRouter);
router.use("/", consultatiiRouter);
router.use("/", mediciXserviciiRouter);

module.exports = router;
