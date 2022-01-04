import React, { Component } from "react";
import { Table } from "react-bootstrap";
import ConsultatiiFunctions from "../functions/consultatiiFunctions";

class Consultatii extends Component {
  state = {
    consultatii: [],
    consultatiiFunctions: new ConsultatiiFunctions(),
  };

  componentDidMount() {
    const fetchConsultatii = async () => {
      const consultatii =
        await this.state.consultatiiFunctions.getConsultatii();
      this.setState({ ...this.state, consultatii });
    };
    fetchConsultatii();
  }

  render() {
    return (
      <div>
        <h1
          style={{
            margin: "20px 0",
          }}
        >
          Consultatii
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nume medic</th>
              <th>Nume animal</th>
              <th>Simptome</th>
              <th>Tip serviciu</th>
            </tr>
          </thead>
          <tbody>
            {this.state.consultatii.map((value, idx) => (
              <tr key={idx}>
                <td>{value.data}</td>
                <td>{value.numeMedic + " " + value.prenume}</td>
                <td>{value.numeAnimal}</td>
                <td>{value.simptome}</td>
                <td>{value.tipServiciu}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Consultatii;
