const express = require("express");
const router = express.Router();

const animaleController = require("../controllers").animale;

//Post
router.post("/addAnimal", animaleController.addAnimal);

//Get
router.get("/findAllAnimale", animaleController.findAllAnimale);
router.get("/getSpecii", animaleController.getSpecii);
router.get("/getAnimaleAndProprietari", animaleController.getAnimaleAndProprietari);



//Delete
router.delete("/deleteAnimalById/:id", animaleController.deleteAnimalById);

module.exports = router;
