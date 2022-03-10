import axios from "axios";
import {
  SERVER,
} from "../constants/constants";

class MediciFunctions {
  async getAllMedici() {
    try {
      const mediciResponse = await axios.get(`${SERVER}/findAllMedici`);
      const medicList = mediciResponse.data;
      return medicList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addMedic(medic) {
    const month = medic.dataNasterii.getUTCMonth() + 1; //months from 1-12
    const day = medic.dataNasterii.getUTCDate();
    const year = medic.dataNasterii.getUTCFullYear();
    medic.dataNasterii = year + "-" + month + "-" + day;
    console.log(medic.dataNasterii);
    if (medic.sex.charAt(0) === "B") {
      medic.sex = "M";
    } else {
      medic.sex = medic.sex.charAt(0);
    }
    try {
      await axios.post(`${SERVER}/addMedic`, medic, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMedic(medicId) {
    try {
      await axios.delete(`${SERVER}/deleteMedicById/${medicId}`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findMedicById(medicId) {
    try {
      const medic = await axios.get(`${SERVER}/findMedicById/${medicId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return medic;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getConsultatiiAndServiciiForMedic(medicId) {
    try {
      const response = await axios.get(
        `${SERVER}/findConsultatiiAndServiciiForMedicByIdMedic/${medicId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const consultatii = response.data;
      return consultatii;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getConsultatiiForMedicByPret(medicId) {
    try {
      const data = await axios.get(
        `${SERVER}/getConsultatiiForMedicByPret/${medicId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getConsultatiiForMedicByYear(medicId) {
    try {
      const data = await axios.get(
        `${SERVER}/getConsultatiiForMedicByYear/${medicId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateMedic(medicId,medic){
    const month = medic.dataNasterii.getUTCMonth() + 1; //months from 1-12
    const day = medic.dataNasterii.getUTCDate();
    const year = medic.dataNasterii.getUTCFullYear();
    medic.dataNasterii = year + "-" + month + "-" + day;
    if (medic.sex.charAt(0) === "B") {
      medic.sex = "M";
    } else {
      medic.sex = medic.sex.charAt(0);
    }
    try {
      await axios.put(`${SERVER}/updateMedicById/${medicId}`, medic);
    } catch (error) {
      console.log(error);
    }
  }
}

export default MediciFunctions;