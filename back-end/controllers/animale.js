const AnimaleDB = require("../models").Animale;

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
    addAnimal: async(req, res) => {
        if(!req.body.nume || req.body.nume.trim()===""){
            return res.status(400).json({message: "Nume invalid"});
        }
        if(!req.body.specie || req.body.specie.trim()===""){
            return res.status(400).json({message: "Specie invalida"});
        }
        if(!req.body.rasa || req.body.rasa.trim()===""){
            return res.status(400).json({message: "Rasa invalida"});
        }
        if(!req.body.dataNasterii || req.body.dataNasterii.trim()==="" || !isValidDate(req.body.dataNasterii)){
            return res.status(400).json({message: "Data nasterii invalida"});
        }

        try{
            const animal = {
                animaled: req.body.animaled,
                nume: req.body.nume,
                specie: req.body.specie,
                rasa: req.body.rasa,
                dataNasterii: req.body.dataNasterii,
            }
            await AnimaleDB.create(animal);
            res.status(200).json({message: "Animal added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new animal"});
        }
    },

    findAllAnimale: async(req, res) => {
        try{
            const animaleDB = await AnimaleDB.findAll();
            res.status(200).json(animaleDB);
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on retrieving animale"});
        }
    },

    deleteAnimalById: async(req,res) =>{
        try{
            const animalDB = await AnimaleDB.destroy({
                where: {
                    animalId: req.params.id,
                }
            });
            if(!animalDB){
                res.status(404).json({message: "No animal to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "Animal deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting animal"});
        }
    }
}



module.exports = controller;