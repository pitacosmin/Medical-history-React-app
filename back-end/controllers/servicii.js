const ServiciiDB = require("../models").Servicii;
const sequelize = require("../models/index").sequelize;
const { QueryTypes } = require("sequelize");

const controller = {
  addServiciu: async (req, res) => {
    if (!req.body.tipServiciu || req.body.tipServiciu.trim() === "") {
      return res.status(400).json({ message: "Tip serviciu invalid" });
    }
    if (!req.body.pret) {
      return res.status(400).json({ message: "Pret invalid" });
    }
    if (!req.body.descriere || req.body.descriere.trim() === "") {
      return res.status(400).json({ message: "Descriere invalida" });
    }

    try {
      const serviciu = {
        tipServiciu: req.body.tipServiciu,
        pret: req.body.pret,
        descriere: req.body.descriere,
      };
      await ServiciiDB.create(serviciu);
      res.status(200).json({ message: "Serviciu added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on creating new serviciu" });
    }
  },

  findAllServicii: async (req, res) => {
    try {
      const serviciiDB = await ServiciiDB.findAll();
      res.status(200).json(serviciiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving servicii" });
    }
  },

  findServiciuById: async (req, res) => {
    try {
      const serviciuDB = await sequelize.query(
        "SELECT DISTINCT * FROM SERVICII WHERE serviciuId = :serviciuId",
        {
          replacements: {
            serviciuId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!serviciuDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(serviciuDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  deleteServiciuById: async (req, res) => {
    try {
      const serviciuDB = await sequelize.query(
        "DELETE FROM SERVICII WHERE serviciuId = :serviciuId",
        {
          replacements: {
            serviciuId: req.params.id,
          },
          type: QueryTypes.DELETE,
      });
      console.log("AM AJUNS AIA");
      if (!serviciuDB) {
        res
          .status(404)
          .json({ message: "No serviciu to delete with id" + req.params.id });
      } else {
        res.status(200).json({ message: "serviciu deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on deleting serviciu" });
    }
  },

  updateServiciuById: async (req,res) => {
    try {
    const [results, rows] = await sequelize.query(
        "UPDATE SERVICII" + 
        " SET tipServiciu=:tipServiciu, pret=:pret, descriere=:descriere" + 
        " WHERE serviciuId = :serviciuId",
        {
          replacements: {
            tipServiciu: req.body.tipServiciu,
            pret: req.body.pret,
            descriere: req.body.descriere,
            serviciuId: req.params.id,
          },
          type: QueryTypes.UPDATE,
        });
        if(rows===1){
          return res.status(204).json({ message: "Update successful"});
        }
      }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error on updating serviciu" });
      }
  }
};

module.exports = controller;
