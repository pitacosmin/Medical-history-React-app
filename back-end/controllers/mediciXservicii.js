const MediciXServiciiDB = require("../models").MediciXServicii;


const controller = {
    addMedicXServicii: async(req, res) => {
        try{
            const medicXservicii = {
                medicId: req.body.medicId,
                serviciuId: req.body.serviciuId,
            }
            await MediciXServiciiDB.create(medicXservicii);
            res.status(200).json({message: "MedicXServicii added"})
        } catch(error){
            console.log(error);
            res.status(500).json({message: "Error on creating new medicXservicii"});
        }
    },

    deleteMedicXServiciuById: async(req,res) =>{
        try{
            const medicXserviciuDB = await MediciXServiciiDB.destroy({
                where: {
                    medicXserviciuId: req.params.id,
                }
            });
            if(!medicXserviciuDB){
                res.status(404).json({message: "No medicXserviciu to delete with id" + req.params.id});
            }else {
                res.status(200).json({message: "medicXserviciu deleted"});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "Error on deleting medicXserviciu"});
        }
    }
}

module.exports = controller;