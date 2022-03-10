import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import ServiciiFunctions from "../../functions/serviciiFunctions";

class FormularServicii extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount(){
    if(this.props.location.state){
      console.log("DEBUG");
      this.state.functions.findServiciuById(this.props.location.state.serviciuId)
      .then((response)=>{
        console.log(response);
        const serviciu = response.data[0];
        if(serviciu){
          this.setState({ ...this.state, 
            tipServiciu: serviciu.tipServiciu,
            pret: serviciu.pret,
            descriere: serviciu.descriere,
            });
        }
      }).catch((error)=>{
        console.log(error);
      });
    }
  }

  state = {
    tipServiciu: "",
    pret: "",
    descriere: "",
    functions: new ServiciiFunctions(),
  };


  async goBack() {
    const serviciu = {
      tipServiciu: this.state.tipServiciu,
      pret: this.state.pret,
      descriere: this.state.descriere,
    };
    if(this.props.location.state){
      await this.state.functions.updateServiciu(this.props.location.state.serviciuId,serviciu);
    } else{
      await this.state.functions.addServiciu(serviciu);
    }
    this.props.history.push("/servicii");
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
          <Form.Group className="mb-3" controlId="formBasicServiciu">
            <Form.Label>Tip serviciu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrie tipul de serviciu"
              value={this.state.tipServiciu}
              onChange={(e) => {
                this.setState({
                  tipServiciu: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPret">
            <Form.Label>Pret</Form.Label>
            <Form.Control
              type="number"
              placeholder="Scrie pretul"
              value={this.state.pret}
              onChange={(e) => {
                this.setState({
                  pret: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescriere">
            <Form.Label>Descriere</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={this.state.descriere}
              onChange={(e) => {
                this.setState({
                  descriere: e.target.value,
                });
              }}
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

export default withRouter(FormularServicii);
