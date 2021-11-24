
const ProprietariDB = require("../models").Proprietari;
const AnimaleDB = require("../models").Animale;
const FiseMedicaleDB = require("../models").FiseMedicale;
const ConsultatiiDB = require("../models").Consultatii;
const MediciDB = require("../models").Medici;
const ServiciiDB = require("../models").Servicii;
const MediciXServiciiDB = require("../models").MediciXServicii;

const proprietari = require("./populateTables/proprietari.json");
const animale = require("./populateTables/animale.json");
const fiseMedicale = require("./populateTables/fiseMedicale.json");
const consultatii = require("./populateTables/consultatii.json");
const medici = require("./populateTables/medici.json");
const servicii = require("./populateTables/servicii.json");
const mediciXservicii = require("./populateTables/mediciXservicii.json");

const controller = {
    populateTables: async (req,res) =>{
        try {
           for(let i = 0; i < proprietari.length; i++){
            await ProprietariDB.create(proprietari[i]);
           } 
           for(let i = 0; i < animale.length; i++){
            await AnimaleDB.create(animale[i]);
           }
           for(let i = 0; i < fiseMedicale.length; i++){
            await FiseMedicaleDB.create(fiseMedicale[i]);
           } 
           for(let i = 0; i < medici.length; i++){
            await MediciDB.create(medici[i]);
           } 
           for(let i = 0; i < servicii.length; i++){
            await ServiciiDB.create(servicii[i]);
           }
           for(let i = 0; i < mediciXservicii.length; i++){
            await MediciXServiciiDB.create(mediciXservicii[i]);
           } 
           for(let i = 0; i < consultatii.length; i++){
            await ConsultatiiDB.create(consultatii[i]);
           } 
           
          

           res.status(200).json({
               message: "Tables populated",
           });
        } catch(err) {
            console.log(err);
            res.status(500).json({
                message: "Error on populating tables",
            });
        }
    }
}

module.exports = controller;