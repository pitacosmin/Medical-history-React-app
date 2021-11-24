const express = require("express");
const router = express.Router();

const proprietariController = require("../controllers").proprietari;

//Post
router.post("/addProprietar", proprietariController.addProprietar);

//Get
router.get("/findAllProprietari",proprietariController.findAllProprietari);

//Delete
router.delete("/deleteProprietarById/:id", proprietariController.deleteProprietarById);

//Update
router.put("/updateNumarTelefon/:id", proprietariController.updateNumarTelefon);



module.exports = router;