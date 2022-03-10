import axios from "axios";
import { SERVER } from "../constants/constants";

class ConsultatiiFunctions {
  constructor() {}

  async getConsultatii() {
    try {
      const consultatiiResponse = await axios.get(
        `${SERVER}/getConsultatiiInformation`
      );
      const consultatii = consultatiiResponse.data;
      return consultatii;
    } catch (error) {
      console.log(error);
    }
  }

  async getConsultatiiByMedic(nume) {
    try {
      const consultatiiResponse = await axios.get(
        `${SERVER}/getConsultatiiByMedic/${nume}`
      );
      const consultatii = consultatiiResponse.data;
      return consultatii;
    } catch (error) {
      console.log(error);
    }
  }

  async getConsultatiiBySpecie(specie) {
    try {
      const speciiResponse = await axios.get(
        `${SERVER}/getConsultatiiBySpecie/${specie}`
      );
      const specii = speciiResponse.data;
      return specii;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConsultatiiFunctions;
