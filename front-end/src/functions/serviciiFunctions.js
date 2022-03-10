import axios from "axios";
import { SERVER } from "../constants/constants";

class ServiciiFunctions {
  constructor() {}

  async getAllServicii() {
    try {
      const serviciiResponse = await axios.get(`${SERVER}/findAllServicii`);
      const serviciuList = serviciiResponse.data;
      return serviciuList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findServiciuById(serviciuId) {
    try {
      const serviciu = await axios.get(`${SERVER}/findServiciuById/${serviciuId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return serviciu;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteServiciu(serviciuId) {
    try {
      await axios.delete(`${SERVER}/deleteServiciuById/${serviciuId}`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addServiciu(serviciu){
    try {
      await axios.post(`${SERVER}/addServiciu`, serviciu, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateServiciu(serviciuId,serviciu){
    try {
      await axios.put(`${SERVER}/updateServiciuById/${serviciuId}`, serviciu);
    } catch (error) {
      console.log(error);
    }
  }
}

 
export default ServiciiFunctions;
