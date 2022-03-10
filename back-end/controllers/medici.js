const MediciDB = require("../models").Medici;
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
  addMedic: async (req, res) => {
    if (!req.body.nume || req.body.nume.trim() === "") {
      return res.status(400).json({ message: "Nume invalid" });
    }
    if (!req.body.prenume || req.body.prenume.trim() === "") {
      return res.status(400).json({ message: "Prenume invalid" });
    }
    if (
      !req.body.dataNasterii ||
      req.body.dataNasterii.trim() === "" ||
      !isValidDate(req.body.dataNasterii)
    ) {
      return res.status(400).json({ message: "Data nasterii invalida" });
    }
    if (!req.body.sex || req.body.sex.trim() === "") {
      return res.status(400).json({ message: "Sex invalid" });
    }
    if (!req.body.specializare || req.body.specializare.trim() === "") {
      return res.status(400).json({ message: "Specializare invalida" });
    }

    try {
      const medic = {
        nume: req.body.nume,
        prenume: req.body.prenume,
        dataNasterii: req.body.dataNasterii,
        sex: req.body.sex,
        specializare: req.body.specializare,
      };
      // await MediciDB.create(medic);
      await sequelize.query(
        "INSERT INTO MEDICI(nume, prenume, dataNasterii, sex, specializare) VALUES(:nume, :prenume, :dataNasterii, :sex, :specializare)",
        {
          replacements: {
            nume: medic.nume,
            prenume: medic.prenume,
            dataNasterii: medic.dataNasterii,
            sex: medic.sex,
            specializare: medic.specializare,
          },
          type: QueryTypes.INSERT,
        }
      );

      res.status(200).json({ message: "Medic added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on creating new medic" });
    }
  },

  findAllMedici: async (req, res) => {
    try {
      const mediciDB = await sequelize.query("SELECT * FROM MEDICI", {
        type: QueryTypes.SELECT,
      });
      // const mediciDB = await MediciDB.findAll();
      res.status(200).json(mediciDB);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on retrieving medici" });
    }
  },

  findMedicById: async (req, res) => {
    try {
      const medicDB = await sequelize.query(
        "SELECT * FROM MEDICI WHERE medicId = :medicId",
        {
          replacements: {
            medicId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );

      // const medicDB = await MediciDB.findByPk(req.params.id);
      if (!medicDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(medicDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  findConsultatiiAndServiciiForMedicByIdMedic: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(
        "SELECT C.data, S.tipServiciu, S.pret, S.descriere FROM MEDICI as M" + 
        " INNER JOIN MEDICIXSERVICII as MXS ON M.medicId = MXS.medicId" +  
        " INNER JOIN CONSULTATII as C ON MXS.mediciXserviciiId = C.mediciXserviciiId" +  
        " INNER JOIN SERVICII as S ON S.serviciuId = MXS.serviciuId WHERE M.medicId = :medicId",
        {
          replacements: {
            medicId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!consultatiiDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(consultatiiDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  getConsultatiiForMedicByPret: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(
        "SELECT C.data, S.tipServiciu, S.pret, S.descriere FROM MEDICI as M" + 
              " INNER JOIN MEDICIXSERVICII as MXS ON M.medicId = MXS.medicId" + 
              " INNER JOIN CONSULTATII as C ON MXS.mediciXserviciiId = C.mediciXserviciiId" +
              " INNER JOIN SERVICII as S ON S.serviciuId = MXS.serviciuId" +
        " WHERE S.pret >= (SELECT AVG(S2.pret) FROM SERVICII as S2 " +
						               " INNER JOIN MEDICIXSERVICII as MXS2 ON S2.serviciuId = MXS2.serviciuId" +
						               " INNER JOIN MEDICI as M2 ON M2.medicId=MXS2.medicId" +
						               " INNER JOIN CONSULTATII as C2 ON MXS2.mediciXserviciiId = C2.mediciXserviciiId" +
                           " WHERE M2.medicId = M.medicId)" +
        " AND M.medicId = :medicId",
        {
          replacements: {
            medicId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!consultatiiDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(consultatiiDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  getConsultatiiForMedicByYear: async (req, res) => {
    try {
      const consultatiiDB = await sequelize.query(
        "SELECT C.data, S.tipServiciu, S.pret, S.descriere FROM consultatii C" +
        " INNER JOIN MEDICIXSERVICII as MXS ON MXS.mediciXserviciiId = C.mediciXserviciiId" +  
        " INNER JOIN SERVICII as S ON S.serviciuId = MXS.serviciuId" +
		    " WHERE YEAR(C.data) = (SELECT MAX(YEAR(C2.data)) FROM CONSULTATII C2" + 
							" JOIN MEDICIXSERVICII as MXS2 ON MXS2.mediciXserviciiId = C2.mediciXserviciiId" +
                           " WHERE MXS2.medicId = MXS.medicId)" +
        " AND MXS.medicId = :medicId" + 
        " ORDER BY C.data DESC",
        {
          replacements: {
            medicId: req.params.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!consultatiiDB) {
        return res.status(404).json(null);
      } else {
        res.status(200).json(consultatiiDB);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(null);
    }
  },

  deleteMedicById: async (req, res) => {
    try {
      const medicDB = await sequelize.query(
        "DELETE FROM MEDICI WHERE medicId = :medicId",
        {
          replacements: {
            medicId: req.params.id,
          },
          type: QueryTypes.DELETE,
        }
      );

      // const medicDB = await MediciDB.destroy({
      //   where: {
      //     medicId: req.params.id,
      //   },
      // });
      console.log(medicDB);
      if (medicDB !== undefined) {
        res
          .status(404)
          .json({ message: "No medic to delete with id " + req.params.id });
      } else {
        res.status(200).json({ message: "medic deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on deleting medic" });
    }
  },

  updateMedicById: async (req,res) => {
    try {
    const [results, rows] = await sequelize.query(
        "UPDATE MEDICI" + 
        " SET nume=:nume, prenume=:prenume, sex=:sex, specializare=:specializare, dataNasterii=:dataNasterii" + 
        " WHERE medicId = :medicId",
        {
          replacements: {
            nume: req.body.nume,
            prenume: req.body.prenume,
            sex: req.body.sex,
            specializare: req.body.specializare,
            dataNasterii: req.body.dataNasterii,
            medicId: req.params.id,
          },
          type: QueryTypes.UPDATE,
        });
        if(rows===1){
          return res.status(204).json({ message: "Update successful"});
        }
      }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error on updating medic" });
      }
  }
};

module.exports = controller;
