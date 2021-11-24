const FiseMedicaleDB = require("../models").FiseMedicale;

const controller = {
    addFisaMedicala: async(req, res) => {
        if(!req.body.greutate || req.body.greutate.trim()===""){
            return res.status(400).json({message: "Greutate invalida"});
        }
        if(!req.body.simptome || req.body.simptome.trim()===""){
            return res.status(400).json({message: "Introduceti simptome"});
        }

        try{
            const fisaMedicala = {
                animalId: req.body.animalId,
                greutate: req.body.greutate,
                vaccinat: req.body.vaccinat,
                simptome: req.body.simptome,
            }
            await FiseMedicaleDB.create(fisaMedicala);
            res.status(200).json({message: "Fisa medicala added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new fisa medicala"});
        }
    },

    findAllFiseMedicale: async(req, res) => {
        try{
            const fiseMedicaleDB = await FiseMedicaleDB.findAll();
            res.status(200).json(fiseMedicaleDB);
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on retrieving fiseMedicale"});
        }
    },

    deleteFisaMedicalaById: async(req,res) =>{
        try{
            const fisaMedicalaDB = await FiseMedicaleDB.destroy({
                where: {
                    fisaMedicalaId: req.params.id,
                }
            });
            if(!fisaMedicalaDB){
                res.status(404).json({message: "No fisaMedicala to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "FisaMedicala deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting fisaMedicala"});
        }
    }
}

module.exports = controller;