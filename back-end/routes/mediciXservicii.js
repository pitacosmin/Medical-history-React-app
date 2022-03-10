const express = require("express");
const router = express.Router();

const mediciXserviciiController = require("../controllers").mediciXservicii;

// POST
router.post("/addMedicXServiciu", mediciXserviciiController.addMedicXServiciu);

// GET
router.get("/findAllMediciXServicii",mediciXserviciiController.findAllMediciXServicii);

// DELETE
router.delete("/deleteMedicXServiciuById/:id", mediciXserviciiController.deleteMedicXServiciuById);

module.exports = router;
