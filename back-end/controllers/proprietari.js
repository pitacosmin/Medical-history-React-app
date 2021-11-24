const ProprietariDB = require("../models").Proprietari;

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const controller = {
    addProprietar: async(req, res) => {
        if(!req.body.nume || req.body.nume.trim()===""){
            return res.status(400).json({message: "Nume invalid"});
        }
        if(!req.body.prenume || req.body.prenume.trim()===""){
            return res.status(400).json({message: "Prenume invalid"});
        }
        if(!req.body.numarTelefon || req.body.numarTelefon.length!==10 || !/^\d+$/.test(req.body.numarTelefon)){
            return res.status(400).json({message: "Numar telefon invalid"});
        }
        if(!req.body.email || req.body.email.trim()==="" || !validateEmail(req.body.email)){
            return res.status(400).json({message: "Email invalid"});
        }

        try{
            const proprietar = {
                nume: req.body.nume,
                prenume: req.body.prenume,
                numarTelefon: req.body.numarTelefon,
                email: req.body.email,
            }
            await ProprietariDB.create(proprietar);
            res.status(200).json({message: "Proprietar added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new proprietar"});
        }
    },


    findAllProprietari: async(req, res) => {
        try{
            const proprietariDB = await ProprietariDB.findAll();
            res.status(200).json(proprietariDB);
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on retrieving proprietari"});
        }
    },

    deleteProprietarById: async(req,res) =>{
        try{
            const proprietarDB = await ProprietariDB.destroy({
                where: {
                    proprietarId: req.params.id,
                }
            });
            if(!proprietarDB){
                res.status(404).json({message: "No proprietar to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "Proprietar deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting proprietar"});
        }
    },

    updateNumarTelefon: async (req,res) =>{
        try{
            const proprietarDBBeforeUpdate = await ProprietariDB.findByPk(req.params.id);
            if(!proprietarDBBeforeUpdate){
                return res.status(404).json({message: "No proprietar found with Id " + req.params.id});
            }
            if(!req.body.numarTelefon || req.body.numarTelefon.length!==10 || !/^\d+$/.test(req.body.numarTelefon)){
                return res.status(404).json({message: "Numar invalid"});
            }
            const proprietarDB = await ProprietariDB.update(
                { 
                    numarTelefon: req.body.numarTelefon
                },
                {
                    where: {
                        proprietarId: req.params.id
                    }
                }
            );
            return res.status(200).json({message: "Numar telefon proprietar updated"});
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Error on updating numar telefon proprietar"});
        }
    }
}

module.exports = controller;
