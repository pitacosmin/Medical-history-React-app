const express = require("express");
const router = express.Router();

const consultatiiController = require("../controllers").consultatii;

router.post("/addConsultatie", consultatiiController.addConsultatie);
router.get("/findAllConsultatii",consultatiiController.findAllConsultatii);
router.delete("/deleteConsultatieById/:id", consultatiiController.deleteConsultatieById);

module.exports = router;