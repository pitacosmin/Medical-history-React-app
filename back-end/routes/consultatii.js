const express = require("express");
const router = express.Router();

const consultatiiController = require("../controllers").consultatii;

// POST
router.post("/addConsultatie", consultatiiController.addConsultatie);

// GET
router.get("/findAllConsultatii", consultatiiController.findAllConsultatii);
router.get("/getConsultatiiInformation",consultatiiController.getConsultatiiInformation);
router.get("/getConsultatiiByMedic/:nume",consultatiiController.getConsultatiiByMedic);
router.get("/getConsultatiiBySpecie/:specie",consultatiiController.getConsultatiiBySpecie);


// DELETE
router.delete(
  "/deleteConsultatieById/:id",
  consultatiiController.deleteConsultatieById
);

module.exports = router;
