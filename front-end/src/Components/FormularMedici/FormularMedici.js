import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MediciFunctions from "../../functions/mediciFunctions";

class FormularMedici extends Component {
  constructor(props) {
    super(props);
    this.changeRadio = this.changeRadio.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount(){
    if(this.props.location.state){
      this.state.functions.findMedicById(this.props.location.state.medicId)
      .then((response)=>{
        const medic = response.data[0];
        if(medic){
          this.setState({ ...this.state, 
            nume: medic.nume,
            prenume: medic.prenume,
            checkedRadio: medic.sex === "M" ? "Barbat":"Femeie",
            specializare: medic.specializare,
            dataNasterii: new Date(medic.dataNasterii),
            });
        }
      }).catch((error)=>{
        console.log(error);
      });
    }
  }

  state = {
    nume: "",
    prenume: "",
    dataNasterii: new Date(),
    sex: ["Barbat", "Femeie"],
    specializare: "",
    checkedRadio: "Barbat",
    functions: new MediciFunctions(),
  };

  changeRadio(e) {
    this.setState({ checkedRadio: e.target.value });
  }

  setDataNasterii(date) {
    this.setState({
      dataNasterii: date,
    });
  }

  async goBack() {
    const medic = {
      nume: this.state.nume,
      prenume: this.state.prenume,
      dataNasterii: this.state.dataNasterii,
      sex: this.state.checkedRadio,
      specializare: this.state.specializare,
    };
    if(this.props.location.state){
      await this.state.functions.updateMedic(this.props.location.state.medicId,medic);
    } else{
      await this.state.functions.addMedic(medic);
    }
    this.props.history.push("/");
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "50px 0",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nume"
              value={this.state.nume}
              onChange={(e) => {
                this.setState({
                  nume: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Prenume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter prenume"
              value={this.state.prenume}
              onChange={(e) => {
                this.setState({
                  prenume: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="radio"
              name="radio"
              label={this.state.sex[0]}
              value={this.state.sex[0]}
              onChange={this.changeRadio}
              defaultChecked
            />
            <Form.Check
              type="radio"
              name="radio"
              label={this.state.sex[1]}
              value={this.state.sex[1]}
              onChange={this.changeRadio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSpecializare">
            <Form.Label>Specializare</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={this.state.specializare}
              onChange={(e) => {
                this.setState({
                  specializare: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Data nasterii</Form.Label>
            <DatePicker
              selected={this.state.dataNasterii}
              onChange={(date) => this.setDataNasterii(date)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            style={{
              marginTop: "20px",
            }}
            onClick={this.goBack}
          >
            {this.props.location.state ? "Modifica":"Adauga"}
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(FormularMedici);
