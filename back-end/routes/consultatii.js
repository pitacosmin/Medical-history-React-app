const express = require("express");
const router = express.Router();

const consultatiiController = require("../controllers").consultatii;

// POST
router.post("/addConsultatie", consultatiiController.addConsultatie);

// GET
router.get("/findAllConsultatii", consultatiiController.findAllConsultatii);

// DELETE
router.delete(
  "/deleteConsultatieById/:id",
  consultatiiController.deleteConsultatieById
);

module.exports = router;
