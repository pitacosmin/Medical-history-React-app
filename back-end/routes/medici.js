const express = require("express");
const router = express.Router();

const mediciController = require("../controllers").medici;

// POST
router.post("/addMedic", mediciController.addMedic);

// GET
router.get("/findAllMedici", mediciController.findAllMedici);

// DELETE
router.delete("/deleteMedicById/:id", mediciController.deleteMedicById);

module.exports = router;
