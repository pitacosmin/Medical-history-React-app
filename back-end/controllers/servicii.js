const ServiciiDB = require("../models").Servicii;

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

  deleteServiciuById: async (req, res) => {
    try {
      const serviciuDB = await ServiciiDB.destroy({
        where: {
          serviciuId: req.params.id,
        },
      });
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

  updatePret: async (req, res) => {
    try {
      const serviciuDBBeforeUpdate = await ServiciiDB.findByPk(req.params.id);
      if (!serviciuDBBeforeUpdate) {
        return res
          .status(404)
          .json({ message: "No serviciu found with Id " + req.params.id });
      }
      if (!req.body.pret) {
        return res.status(400).json({ message: "Pret invalid" });
      }
      const serviciuDB = await ServiciiDB.update(
        {
          pret: req.body.pret,
        },
        {
          where: {
            serviciuId: req.params.id,
          },
        }
      );
      return res.status(200).json({ message: "Pret serviciu updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on updating pret serviciu" });
    }
  },
};

module.exports = controller;
