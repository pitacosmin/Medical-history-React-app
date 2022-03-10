const FiseMedicaleDB = require("../models").FiseMedicale;
const sequelize = require("../models/index").sequelize;
const { QueryTypes } = require("sequelize");

const controller = {

  getFiseMedicaleAndAnimal: async (req, res) => {
    try {
      const fisaDB = await sequelize.query(
        " SELECT A.nume, A.specie, A.rasa, A.dataNasterii, F.fisaId, F.greutate, F.vaccinat, F.simptome FROM fisemedicale F" + 
	         " JOIN ANIMALE A ON F.animalId = A.animalId",
        {
          type: QueryTypes.SELECT,
        }
      );
      if (!fisaDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(fisaDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  getFiseMedicaleByVaccin: async (req, res) => {
    try {
      const fisaDB = await sequelize.query(
        " SELECT A.nume, A.specie, A.rasa, A.dataNasterii, F.fisaId, F.greutate, F.vaccinat, F.simptome FROM fisemedicale F" + 
	         " JOIN ANIMALE A ON F.animalId = A.animalId" + 
           " WHERE F.vaccinat = 1",
        {
          type: QueryTypes.SELECT,
        }
      );
      if (!fisaDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(fisaDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

};

module.exports = controller;
