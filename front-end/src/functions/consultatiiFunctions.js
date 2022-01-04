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
}

export default ConsultatiiFunctions;
