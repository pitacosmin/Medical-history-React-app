import axios from "axios";
import {
  SERVER,
} from "../constants/constants";

class ProprietariFunctions {
  async getAllProprietari() {
    try {
      const proprietariResponse = await axios.get(`${SERVER}/findAllProprietari`);
      const proprietarList = proprietariResponse.data;
      return proprietarList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findProprietarById(proprietarId) {
    try {
      const proprietar = await axios.get(`${SERVER}/findProprietarById/${proprietarId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return proprietar.data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default ProprietariFunctions;