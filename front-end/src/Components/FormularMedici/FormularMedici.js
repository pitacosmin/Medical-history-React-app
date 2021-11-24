import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class FormularMedici extends Component {
  constructor(props) {
    super(props);
    this.changeRadio = this.changeRadio.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    nume: "",
    prenume: "",
    dataNasterii: new Date(),
    sex: ["Barbat", "Femeie"],
    specializare: "",
    checkedRadio: "Barbat",
  };

  changeRadio(e) {
    this.setState({ checkedRadio: e.target.value });
  }

  setDataNasterii(date) {
    this.setState({
      dataNasterii: date,
    });
  }

  goBack() {
    const medic = {
      nume: this.state.nume,
      prenume: this.state.prenume,
      dataNasterii: this.state.dataNasterii,
      sex: this.state.checkedRadio,
      specializare: this.state.specializare,
    };
    this.props.location.state.addMedic(medic);
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
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(FormularMedici);
