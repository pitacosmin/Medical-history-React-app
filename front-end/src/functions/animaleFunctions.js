import axios from "axios";
import { SERVER } from "../constants/constants";

class AnimaleFunctions {
  constructor() {}

  async getSpecii() {
    try {
      const speciiResponse = await axios.get(
        `${SERVER}/getSpecii`
      );
      const specii = speciiResponse.data;
      return specii;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllAnimale() {
    try {
      const animaleResponse = await axios.get(`${SERVER}/findAllAnimale`);
      const animaleList = animaleResponse.data;
      return animaleList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getAnimaleAndProprietari() {
    try {
      const animaleAndProprietariResponse = await axios.get(`${SERVER}/getAnimaleAndProprietari`);
      const animaleAndProprietariList = animaleAndProprietariResponse.data;
      return animaleAndProprietariList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}



export default AnimaleFunctions;
