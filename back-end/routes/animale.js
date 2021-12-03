const express = require("express");
const router = express.Router();

const animaleController = require("../controllers").animale;

//Post
router.post("/addAnimal", animaleController.addAnimal);

//Get
router.get("/findAllAnimale", animaleController.findAllAnimale);

//Delete
router.delete("/deleteAnimalById/:id", animaleController.deleteAnimalById);

module.exports = router;
