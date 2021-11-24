import React, { Component } from "react";
import { Button } from "react-bootstrap";


import { ADD_MEDIC_SUCCES, GET_MEDICI_SUCCES,DELETE_MEDIC_SUCCES, FIND_MEDIC_SUCCES } from "../constants/constants";
import MediciFunctions from "../functions/mediciFunctions";

import Medic from "./Medic/Medic";

class Medici extends Component {
  constructor(props) {
    super(props);
    this.addMedic = this.addMedic.bind(this);
    this.goToFormularMedici = this.goToFormularMedici.bind(this);
    this.deleteMedic = this.deleteMedic.bind(this);
    this.findMedicById = this.findMedicById.bind(this);
  }

  state = {
    medicList: [],
    functions: new MediciFunctions(),
  };

  componentDidMount() {
    if (this.state.medicList.length === 0) {
      this.state.functions.getAllMedici();
      this.state.functions.emitter.addListener(GET_MEDICI_SUCCES, () => {
        this.setState({
          medicList: this.state.functions.medici,
        });
      });
    } else {
      this.state.functions.emitter.addListener(ADD_MEDIC_SUCCES, () => {
        this.setState({
          medicList: this.state.functions.medici,
        });
      });
    }
  }

  goToFormularMedici = () => {
    this.props.history.push({
      pathname: "/formularMedici",
      state: { addMedic: this.addMedic },
    });
  };

  // goToInformatiiMedic
  //  = () =>{
  //   this.props.history.push({
  //     pathname: "/informatiiMedic",
  //   });
  // }

  addMedic(medic) {
    this.state.functions.addMedic(medic);
    // this.state.functions.emitter.addListener(ADD_MEDIC_SUCCES, () => {
    //   this.setState({
    //     medicList: [...this.state.medicList, medic],
    //   });
    // });
  }

  deleteMedic(medicId){
    this.state.functions.deleteMedic(medicId);
    this.state.functions.emitter.addListener(DELETE_MEDIC_SUCCES, () => {
      this.setState({
        medicList: this.state.functions.medici,
      });
    });
  }

  findMedicById(medicId){
    this.state.functions.findMedicById(medicId);
    this.state.functions.emitter.addListener(FIND_MEDIC_SUCCES, () => {
      this.setState({
        medicList: this.state.functions.medici,
      });
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            margin: "50px 100px",
            gridTemplateColumns: "repeat(3, minmax(200px,1fr))",
            gridGap: "50px",
          }}
        >
          {this.state.medicList.length !== 0
            ? this.state.medicList.map((value, index) => (
                <Medic key={index} medic={value} deleteMedic={this.deleteMedic} findMedicById={this.findMedicById}/>
              ))
            : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <Button
            variant="outline-primary"
            size="lg"
            onClick={this.goToFormularMedici}
          >
            Add medic
          </Button>
        </div>
      </div>
    );
  }
}

export default Medici;
