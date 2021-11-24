import { EventEmitter } from "fbemitter";
import axios from "axios";
import {
  SERVER,
  GET_MEDICI_SUCCES,
  GET_MEDICI_ERROR,
} from "../constants/constants";

class MediciFunctions {
  constructor() {
    this.medici = [];
    this.emitter = new EventEmitter();
  }

  async getAllMedici() {
    try {
      const mediciResponse = await axios.get(`${SERVER}/findAllMedici`);
      const medicList = mediciResponse.data;
      this.medici = medicList;
      this.emitter.emit(GET_MEDICI_SUCCES);
    } catch (error) {
      console.log(error);
      this.emitter.emit(GET_MEDICI_ERROR);
    }
  }

  async addMedic(medic) {
    const month = medic.dataNasterii.getUTCMonth() + 1; //months from 1-12
    const day = medic.dataNasterii.getUTCDate();
    const year = medic.dataNasterii.getUTCFullYear();
    medic.dataNasterii = month + "/" + day + "/" + year;
    if (medic.sex.charAt(0) === "B") {
      medic.sex = "M";
    } else {
      medic.sex = medic.sex.charAt(0);
    }
    try {
      await axios.post(`${SERVER}/addMedic`, medic, {
        headers: { "Content-Type": "application/json" },
      });
      this.medici.push(medic);
      console.log(this.medici);
      this.emitter.emit(GET_MEDICI_SUCCES);
    } catch (error) {
      console.log(error);
      this.emitter.emit(GET_MEDICI_ERROR);
    }
  }
}

export default MediciFunctions;
