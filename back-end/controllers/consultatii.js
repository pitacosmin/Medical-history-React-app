const ConsultatiiDB = require("../models").Consultatii;
const sequelize = require("../models/index").sequelize;
const { QueryTypes } = require("sequelize");

function isValidDate(dateString) {
  // First check for the pattern
  // yyyy-mm--dd
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

const controller = {
  addConsultatie: async (req, res) => {
    if (
      !req.body.data ||
      req.body.data.trim() === "" ||
      !isValidDate(req.body.data)
    ) {
      return res.status(400).json({ message: "Data invalida" });
    }

    try {
      const consultatie = {
        mediciXserviciiId: req.body.mediciXserviciiId,
        fisaId: req.body.fisaId,
        data: req.body.data,
      };

      await sequelize.query(
        "INSERT INTO CONSULTATII(mediciXserviciiId, fisaId, data) VALUES(:mediciXserviciiId, :fisaId, :data)",
        {
          replacements: {
            mediciXserviciiId: consultatie.mediciXserviciiId,
            fisaId: consultatie.fisaId,
            data: consultatie.data,
          },
          type: QueryTypes.INSERT,
        }
      );
      // await ConsultatiiDB.create(consultatie);
      res.status(200).json({ message: "Consultatie added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on creating new Consultatie" });
    }
  },

  findAllConsultatii: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query("SELECT * FROM CONSULTATII", {
        type: QueryTypes.SELECT,
      });
      // const consultatiiDB = await ConsultatiiDB.findAll();
      res.status(200).json(consultatiiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving consultatii" });
    }
  },

  deleteConsultatieById: async (req, res) => {
    try {
      const consultatieDB = await sequelize.query(
        "DELETE FROM CONSULTATII WHERE consultatieId = :consultatieId",
        {
          replacements: {
            consultatieId: req.params.id,
          },
          type: QueryTypes.DELETE,
        }
      );
      // const consultatieDB = await ConsultatiiDB.destroy({
      //   where: {
      //     consultatieId: req.params.id,
      //   },
      // });
      if (consultatieDB !== undefined) {
        res.status(404).json({
          message: "No consultatie to delete with id " + req.params.id,
        });
      } else {
        res.status(200).json({ message: "Consultatie deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on deleting consultatie" });
    }
  },

  getConsultatiiInformation: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(
        "SELECT C.data, M.nume as numeMedic, M.prenume, A.nume as numeAnimal, F.simptome, S.tipServiciu" +
          " FROM CONSULTATII as C INNER JOIN MEDICIXSERVICII as MXS ON MXS.mediciXserviciiId = C.mediciXserviciiId" +
          " INNER JOIN MEDICI as M ON MXS.medicId = M.medicId" +
          " INNER JOIN SERVICII as S ON MXS.serviciuId = S.serviciuId" +
          " INNER JOIN FISEMEDICALE as F ON C.fisaId = F.fisaId" +
          " INNER JOIN ANIMALE as A ON F.animalId = A.animalId",
        {
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json(consultatiiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving consultatii" });
    }
  },

  getConsultatiiByMedic: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(
        "SELECT C.data, M.nume as numeMedic, M.prenume, A.nume as numeAnimal, F.simptome, S.tipServiciu" +
          " FROM CONSULTATII as C INNER JOIN MEDICIXSERVICII as MXS ON MXS.mediciXserviciiId = C.mediciXserviciiId" +
          " INNER JOIN MEDICI as M ON MXS.medicId = M.medicId" +
          " INNER JOIN SERVICII as S ON MXS.serviciuId = S.serviciuId" +
          " INNER JOIN FISEMEDICALE as F ON C.fisaId = F.fisaId" +
          " INNER JOIN ANIMALE as A ON F.animalId = A.animalId" +
	        " WHERE M.nume IN (SELECT M2.nume FROM MEDICI M2 WHERE M2.nume = :nume)" +
	        " OR M.prenume IN (SELECT M3.prenume FROM MEDICI M3 WHERE M3.prenume = :nume)",
        {
          replacements: {
            nume: req.params.nume
          },
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json(consultatiiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving consultatii by medic" });
    }
  },

  getConsultatiiBySpecie: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(

        " SELECT C.data, M.nume as numeMedic, M.prenume, A.nume as numeAnimal, F.simptome, S.tipServiciu" +
        " FROM (SELECT A2.animalId, A2.nume FROM Animale A2 WHERE A2.specie = :specie) as A, CONSULTATII as C" +
		      " INNER JOIN MEDICIXSERVICII as MXS ON MXS.mediciXserviciiId = C.mediciXserviciiId" +
          " INNER JOIN MEDICI as M ON MXS.medicId = M.medicId" +
          " INNER JOIN SERVICII as S ON MXS.serviciuId = S.serviciuId" +
          " INNER JOIN FISEMEDICALE as F ON C.fisaId = F.fisaId" +
	      "	WHERE A.animalId = F.animalId",
        {
          replacements: {
            specie: req.params.specie
          },
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json(consultatiiDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving consultatii by specie" });
    }
  },
};

module.exports = controller;
