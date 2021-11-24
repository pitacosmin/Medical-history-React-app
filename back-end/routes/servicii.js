const express = require("express");
const router = express.Router();

const serviciiController = require("../controllers").servicii;

//Post
router.post("/addServiciu", serviciiController.addServiciu);

//Get
router.get("/findAllServicii",serviciiController.findAllServicii);

//Delete
router.delete("/deleteServiciuById/:id", serviciiController.deleteServiciuById);

//Update
router.put("/updatePret/:id", serviciiController.updatePret);


module.exports = router;