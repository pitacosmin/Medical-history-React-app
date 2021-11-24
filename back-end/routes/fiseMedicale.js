const express = require("express");
const router = express.Router();

const fiseMedicaleController = require("../controllers").fiseMedicale;

// POST
router.post("/addFisaMedicala", fiseMedicaleController.addFisaMedicala);

// GET
router.get("/findAllFiseMedicale", fiseMedicaleController.findAllFiseMedicale);

// DELETE
router.delete(
  "/deleteFisaMedicalaById/:id",
  fiseMedicaleController.deleteFisaMedicalaById
);

module.exports = router;
