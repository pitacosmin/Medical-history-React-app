const express = require("express");
const router = express.Router();

const proprietariController = require("../controllers").proprietari;


//Get
router.get("/findAllProprietari", proprietariController.findAllProprietari);
router.get("/findProprietarById/:id", proprietariController.findProprietarById);


module.exports = router;
