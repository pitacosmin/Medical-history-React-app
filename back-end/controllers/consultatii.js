const ConsultatiiDB = require("../models").Consultatii;

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
    addConsultatie: async(req, res) => {
        if(!req.body.data || req.body.data.trim()==="" || !isValidDate(req.body.data)){
            return res.status(400).json({message: "Data invalida"});
        }
    
        try{
            const consultatie = {
                medicId: req.body.medicId,
                serviciuId: req.body.serviciuId,
                fisaId: req.body.fisaId,
                data: req.body.data,
            }
            await ConsultatiiDB.create(consultatie);
            res.status(200).json({message: "Consultatie added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new Consultatie"});
        }
    },

    findAllConsultatii: async(req, res) => {
        try{
            const consultatiiDB = await ConsultatiiDB.findAll();
            res.status(200).json(consultatiiDB);
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on retrieving consultatii"});
        }
    },

    deleteConsultatieById: async(req,res) =>{
        try{
            const consultatieDB = await ConsultatiiDB.destroy({
                where: {
                    consultatieId: req.params.id,
                }
            });
            if(!consultatieDB){
                res.status(404).json({message: "No consultatie to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "Consultatie deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting consultatie"});
        }
    }
}

module.exports = controller;