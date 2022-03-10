import React, { Component, useEffect, useState } from "react";
import { Table, ListGroup } from "react-bootstrap";
import ProprietariFunctions from "../../functions/proprietariFunctions";

class InformatiiProprietar extends Component{
    constructor (props){
        super(props)
    }

    state = {
        proprietar: {},
        proprietariFunctions: new ProprietariFunctions(),
      };

    componentDidMount() {
        const fetchProprietar = async () => {
          const proprietar =
            await this.state.proprietariFunctions.findProprietarById(this.props.match.params.id);
          this.setState({ ...this.state, proprietar });
        };
        fetchProprietar();
      }


    render() {
        return (
          <div>
            <h1 style={{ margin: "20px 0" }}>
              Informatii proprietar
            </h1>
            <div style={{display: "flex", justifyContent: "center"}}>
                <ListGroup variant="flush">
                    <ListGroup.Item>{this.state.proprietar.nume + ' ' + this.state.proprietar.prenume}</ListGroup.Item>
                    <ListGroup.Item>Nr. telefon: {this.state.proprietar.numarTelefon} </ListGroup.Item>
                    <ListGroup.Item>email: {this.state.proprietar.email}</ListGroup.Item>
                    <ListGroup.Item>Numar animale: {this.state.proprietar.NrAnimale}</ListGroup.Item>
                </ListGroup>
            </div>
          </div>
        );
      }

}

export default InformatiiProprietar;