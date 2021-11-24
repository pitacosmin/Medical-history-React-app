const populateTables = require("./populateTables");
const proprietari = require("./proprietari");
const animale = require("./animale");
const fiseMedicale = require("./fiseMedicale");
const medici = require("./medici");
const servicii = require("./servicii");
const consultatii = require("./consultatii");
const mediciXservicii = require("./mediciXservicii");

const controllers = {
    populateTables,
    proprietari,
    animale,
    fiseMedicale,
    medici,
    servicii,
    consultatii,
    mediciXservicii,
};

module.exports = controllers;