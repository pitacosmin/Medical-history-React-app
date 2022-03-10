import React, { Component } from "react";
import { Button } from "react-bootstrap";

import ServiciiFunctions from "../functions/serviciiFunctions";

import Serviciu from "./Serviciu/Serviciu";

class Servicii extends Component {
  constructor(props) {
    super(props);
    this.goToFormularServicii = this.goToFormularServicii.bind(this);
    this.deleteServiciu = this.deleteServiciu.bind(this);
  }

  state = {
    serviciuList: [],
    functions: new ServiciiFunctions(),
  };

  componentDidMount() {
    this.state.functions.getAllServicii().then((servicii)=>{

      this.setState({
        serviciuList: servicii,
      });
    }).catch((error)=>{
      console.log(error);
    });
  }

  goToFormularServicii = () => {
    this.props.history.push({
      pathname: "/formularServicii",
    });
  };

  deleteServiciu(serviciuId) {
    this.state.functions.deleteServiciu(serviciuId).then(()=>{
      this.setState({
        ...this.state,
        serviciuList: this.state.serviciuList.filter((serviciu) => {
          return serviciu.serviciuId !== serviciuId;
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
          {this.state.serviciuList.length !== 0
            ? this.state.serviciuList.map((value, index) => (
                <Serviciu
                  key={index}
                  serviciu={value}
                  deleteServiciu={this.deleteServiciu}
                  findServiciuById={this.findServiciuById}
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
            onClick={this.goToFormularServicii}
          >
            Adauga serviciu
          </Button>
        </div>
      </div>
    );
  }
}

export default Servicii;
