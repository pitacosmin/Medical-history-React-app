import React, { Component } from "react";
import { Button } from "react-bootstrap";

import MediciFunctions from "../functions/mediciFunctions";

import Medic from "./Medic/Medic";

class Medici extends Component {
  constructor(props) {
    super(props);
    this.goToFormularMedici = this.goToFormularMedici.bind(this);
    this.deleteMedic = this.deleteMedic.bind(this);
  }

  state = {
    medicList: [],
    functions: new MediciFunctions(),
  };

  componentDidMount() {
    this.state.functions.getAllMedici().then((medici)=>{

      this.setState({
        medicList: medici,
      });
    }).catch((error)=>{
      console.log(error);
    });
  }

  goToFormularMedici = () => {
    this.props.history.push({
      pathname: "/formularMedici",
    });
  };

  deleteMedic(medicId) {
    this.state.functions.deleteMedic(medicId).then(()=>{
      this.setState({
        ...this.state,
        medicList: this.state.medicList.filter((medic) => {
          return medic.medicId !== medicId;
        })
      })  
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
                <Medic
                  key={index}
                  medic={value}
                  deleteMedic={this.deleteMedic}
                  findMedicById={this.findMedicById}
                />
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
            Adauga medic
          </Button>
        </div>
      </div>
    );
  }
}

export default Medici;
