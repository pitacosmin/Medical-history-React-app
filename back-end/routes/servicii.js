const express = require("express");
const router = express.Router();

const serviciiController = require("../controllers").servicii;

//Post
router.post("/addServiciu", serviciiController.addServiciu);

//Get
router.get("/findAllServicii", serviciiController.findAllServicii);
router.get("/findServiciuById/:id", serviciiController.findServiciuById);

//Delete
router.delete("/deleteServiciuById/:id", serviciiController.deleteServiciuById);

//Update
router.put("/updateServiciuById/:id", serviciiController.updateServiciuById);

module.exports = router;
