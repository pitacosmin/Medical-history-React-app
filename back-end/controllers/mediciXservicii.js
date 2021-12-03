const MediciXServiciiDB = require("../models").MediciXServicii;
const sequelize = require("../models/index").sequelize;
const { QueryTypes } = require("sequelize");

const controller = {
  addMedicXServiciu: async (req, res) => {
    try {
      const medicXservicii = {
        medicId: req.body.medicId,
        serviciuId: req.body.serviciuId,
      };

      await sequelize.query(
        "INSERT INTO MEDICIXSERVICII(medicId, serviciuId) VALUES(:medicId, :serviciuId)",
        {
          replacements: {
            medicId: medicXservicii.medicId,
            serviciuId: medicXservicii.serviciuId,
          },
          type: QueryTypes.INSERT,
        }
      );

      // await MediciXServiciiDB.create(medicXservicii);
      res.status(200).json({ message: "MedicXServicii added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on creating new medicXservicii" });
    }
  },

  findAllMediciXServicii: async (req, res) => {
    try {
      const mediciXserviciiDB = await sequelize.query(
        "SELECT * FROM MEDICIXSERVICII",
        {
          type: QueryTypes.SELECT,
        }
      );
      // const mediciXserviciiDB = await MediciXServiciiDB.findAll();
      res.status(200).json(mediciXserviciiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving animale" });
    }
  },

  deleteMedicXServiciuById: async (req, res) => {
    try {
      const medicXserviciuDB = await sequelize.query(
        "DELETE FROM MEDICIXSERVICII WHERE mediciXserviciiId = :mediciXserviciiId",
        {
          replacements: {
            mediciXserviciiId: req.params.id,
          },
          type: QueryTypes.DELETE,
        }
      );
      // const medicXserviciuDB = await MediciXServiciiDB.destroy({
      //   where: {
      //     medicXserviciuId: req.params.id,
      //   },
      // });
      if (medicXserviciuDB !== undefined) {
        res.status(404).json({
          message: "No medicXserviciu to delete with id " + req.params.id,
        });
      } else {
        res.status(200).json({ message: "medicXserviciu deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on deleting medicXserviciu" });
    }
  },
};

module.exports = controller;
