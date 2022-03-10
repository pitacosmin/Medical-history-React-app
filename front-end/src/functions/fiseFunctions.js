import axios from "axios";
import {
  SERVER,
} from "../constants/constants";

class FiseFunctions {
  async getFiseMedicaleAndAnimal() {
    try {
      const fiseResponse = await axios.get(`${SERVER}/getFiseMedicaleAndAnimal`);
      const fiseList = fiseResponse.data;
      return fiseList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getFiseMedicaleByVaccin() {
    try {
      const fiseResponse = await axios.get(`${SERVER}/getFiseMedicaleByVaccin`);
      const fiseList = fiseResponse.data;
      return fiseList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default FiseFunctions;