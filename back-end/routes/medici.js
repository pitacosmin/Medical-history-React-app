const express = require("express");
const router = express.Router();

const mediciController = require("../controllers").medici;

router.post("/addMedic", mediciController.addMedic);
router.get("/findAllMedici",mediciController.findAllMedici);
router.delete("/deleteMedicById/:id", mediciController.deleteMedicById);

module.exports = router;