const express = require("express");
const router = express.Router();

const fiseMedicaleController = require("../controllers").fiseMedicale;

router.post("/addFisaMedicala", fiseMedicaleController.addFisaMedicala);
router.get("/findAllFiseMedicale",fiseMedicaleController.findAllFiseMedicale);
router.delete("/deleteFisaMedicalaById/:id", fiseMedicaleController.deleteFisaMedicalaById);


module.exports = router;