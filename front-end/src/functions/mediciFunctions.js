import { EventEmitter } from "fbemitter";
import axios from "axios";

const SERVER = "http://localhost:8080";
class MediciFunctions{
    constructor(){
        this.medici=[];
        this.emitter=new EventEmitter();
    }

    async getAllMedici(){
        try{
            const mediciResponse = await axios.get(`${SERVER}/findAllMedici`);
            const medicList = mediciResponse.data;
            this.medici=medicList;
            this.emitter.emit("GET_MEDICI_SUCCES");
        }catch(error){
            console.log(error);
            this.emitter.emit("GET_MEDICI_ERROR");
        }
        
    }
}

export default MediciFunctions;