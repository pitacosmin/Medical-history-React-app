const MediciDB = require("../models").Medici;

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

const controller = {
    addMedic: async(req, res) => {
        if(!req.body.nume || req.body.nume.trim()===""){
            return res.status(400).json({message: "Nume invalid"});
        }
        if(!req.body.prenume || req.body.prenume.trim()===""){
            return res.status(400).json({message: "Prenume invalid"});
        }
        if(!req.body.dataNasterii || req.body.dataNasterii.trim()==="" || !isValidDate(req.body.dataNasterii)){
            return res.status(400).json({message: "Data nasterii invalida"});
        }
        if(!req.body.sex || req.body.sex.trim()===""){
            return res.status(400).json({message: "Sex invalid"});
        }
        if(!req.body.specializare || req.body.specializare.trim()===""){
            return res.status(400).json({message: "Specializare invalida"});
        }

        try{
            const medic = {
                nume: req.body.nume,
                prenume: req.body.prenume,
                dataNasterii: req.body.dataNasterii,
                sex: req.body.sex,
                specializare: req.body.specializare,
            }
            await MediciDB.create(medic);
            res.status(200).json({message: "Medic added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new medic"});
        }
    },

    findAllMedici: async(req, res) => {
        try{
            const mediciDB = await MediciDB.findAll();
            res.status(200).json(mediciDB);
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on retrieving medici"});
        }
    },

    deleteMedicById: async(req,res) =>{
        try{
            const medicDB = await MediciDB.destroy({
                where: {
                    medicId: req.params.id,
                }
            });
            if(!medicDB){
                res.status(404).json({message: "No medic to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "medic deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting medic"});
        }
    }
}

module.exports = controller;
