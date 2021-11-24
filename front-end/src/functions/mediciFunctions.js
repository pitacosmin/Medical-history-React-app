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
}

export default MediciFunctions;
