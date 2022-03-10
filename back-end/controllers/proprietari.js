const ProprietariDB = require("../models").Proprietari;
const sequelize = require("../models/index").sequelize;
const { QueryTypes } = require("sequelize");

const controller = {
  findAllProprietari: async (req, res) => {
    try {
      const proprietariDB = await sequelize.query("SELECT * FROM PROPRIETARI", {
        type: QueryTypes.SELECT,
      });
      res.status(200).json(proprietariDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving proprietari" });
    }
  },

  findProprietarById: async (req, res) => {
    try {
      const proprietarDB = await sequelize.query(
        "SELECT P.proprietarId, P.nume, P.prenume, P.numarTelefon, P.email, count(A.animalId) as NrAnimale FROM PROPRIETARI P" + 
        " JOIN ANIMALE A ON A.proprietarId = P.proprietarId" +
        " WHERE P.proprietarId = :proprietarId" +
        " GROUP BY P.nume",
        {
          replacements: {
            proprietarId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      console.log(proprietarDB);
      if (!proprietarDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(proprietarDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },
  
};

module.exports = controller;
