const express = require("express");
const router = express.Router();

const mediciController = require("../controllers").medici;

// POST
router.post("/addMedic", mediciController.addMedic);

// GET
router.get("/findAllMedici", mediciController.findAllMedici);
router.get("/findMedicById/:id", mediciController.findMedicById);
router.get("/findConsultatiiAndServiciiForMedicByIdMedic/:id",mediciController.findConsultatiiAndServiciiForMedicByIdMedic);
router.get("/getConsultatiiForMedicByPret/:id",mediciController.getConsultatiiForMedicByPret);
router.get("/getConsultatiiForMedicByYear/:id",mediciController.getConsultatiiForMedicByYear);


// DELETE
router.delete("/deleteMedicById/:id", mediciController.deleteMedicById);


// UPDATE
router.put("/updateMedicById/:id", mediciController.updateMedicById);

module.exports = router;
