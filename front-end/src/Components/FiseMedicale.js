import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

import FiseFunctions from "../functions/fiseFunctions";

class FiseMedicale extends Component {

  state = {
    fiseMedicaleList: [],
    functions: new FiseFunctions(),
  };

  componentDidMount() {
    this.state.functions.getFiseMedicaleAndAnimal().then((fise)=>{
      this.setState({
        fiseMedicaleList: fise,
      });
    }).catch((error)=>{
      console.log(error);
    });
  };

  render() {
    return (
      <div>
        <h1 style={{ margin: "20px 0" }}>
          Fise medicale
        </h1>
        <div style={{display: 'flex', alignSelf:"flex-start", marginLeft: 50, marginBottom: 5}}>
            <Button variant="outline-secondary"
                style= {{ height : 40 }} 
                onClick={async () => {
                    const fise = await this.state.functions.getFiseMedicaleByVaccin();
                    console.log(fise);
                    this.setState({
                        fiseMedicaleList: fise,
                      });;
                }}
            >
                Animale vaccinate
            </Button>
            <Button variant="outline-danger"
                style= {{ height : 40 , marginLeft: 10}} 
                onClick={async () => {
                    const fise = await this.state.functions.getFiseMedicaleAndAnimal();
                    console.log(fise);
                    this.setState({
                        fiseMedicaleList: fise,
                      });;
                }}
            >
                Reseteaza
            </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nr. fisa</th>
              <th>Nume animal</th>
              <th>Specie</th>
              <th>Rasa</th>
              <th>Data nasterii</th>
              <th>Greutate</th>
              <th>Vaccin</th>
              <th>Simptome</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fiseMedicaleList.map((value, idx) => (
              <tr key={idx}>
                <td>{value.fisaId}</td>
                <td>{value.nume}</td>
                <td>{value.specie}</td>
                <td>{value.rasa}</td>
                <td>{value.dataNasterii}</td>
                <td>{value.greutate}</td>
                <td>{value.vaccinat ? 'da' : 'nu'}</td>
                <td>{value.simptome}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default FiseMedicale;
