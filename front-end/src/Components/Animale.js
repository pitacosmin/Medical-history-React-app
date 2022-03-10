import React, { Component } from "react";
import { Table } from "react-bootstrap";

import AnimaleFunctions from "../functions/animaleFunctions";

class Animale extends Component {
  constructor(props) {
    super(props);
    this.goToInformatiiProprietar = this.goToInformatiiProprietar.bind(this);
  }

  state = {
    animaleAndProprietariList: [],
    functions: new AnimaleFunctions(),
  };

  componentDidMount() {
    this.state.functions.getAnimaleAndProprietari().then((animale)=>{
      this.setState({
        animaleAndProprietariList: animale,
      });
    }).catch((error)=>{
      console.log(error);
    });
  };

  goToInformatiiProprietar = (proprietarId) => {
    this.props.history.push({
        pathname: `/informatiiProprietar/${proprietarId}`,
    });
};

  render() {
    return (
      <div>
        <h1 style={{ margin: "20px 0" }}>
          Animale
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nume Animal</th>
              <th>Specie</th>
              <th>Rasa</th>
              <th>Proprietar</th>
              <th>Detalii proprietar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.animaleAndProprietariList.map((value, idx) => (
              <tr key={idx}>
                <td>{value.numeAnimal}</td>
                <td>{value.specie}</td>
                <td>{value.rasa}</td>
                <td>{value.proprietar}</td>
                <td><p style={{color:"blue", textDecoration:"underline" }} onClick={() => {this.goToInformatiiProprietar(value.proprietarId);}}>Date contact</p></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Animale;
