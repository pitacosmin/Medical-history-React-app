import React, { Component } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import ConsultatiiFunctions from "../functions/consultatiiFunctions";
import AnimaleFunctions from "../functions/animaleFunctions";
import { FaSearch } from "react-icons/fa";

class Consultatii extends Component {
  state = {
    consultatii: [],
    consultatiiFunctions: new ConsultatiiFunctions(),
    animaleFunctions: new AnimaleFunctions(),
    searchText: "",
    listaSpecii: [],
  };

  componentDidMount() {
    const fetchConsultatii = async () => {
      const consultatii =
        await this.state.consultatiiFunctions.getConsultatii();
      this.setState({ ...this.state, consultatii });
    };
    const fetchSpecii = async () => {
      const listaSpecii =
        await this.state.animaleFunctions.getSpecii();
      this.setState({ ...this.state, listaSpecii });
    };
    fetchConsultatii();
    fetchSpecii();
  }

  render() {
    return (
      <div>
        <h1 style={{ margin: "20px 0" }}>
          Consultatii
        </h1>
        <div style={{display:"flex", height : 50 , "width" : "100%"}}>
          <div style={{display:"flex", flex: 1 }}>
            <div style={{ alignSelf:"flex-start", marginLeft: 50, marginTop: 5}}>
                <FaSearch size={25} />
            </div>
          <input 
            style={{alignSelf:"flex-start", marginLeft: 5, width: 400, height: 40}}
            placeholder= "Cauta consultatii dupa numele medicului"
            value={this.state.searchText}
            onChange={(e) => {
              this.setState({
                searchText: e.target.value,
              });
            }}/>
           <Button variant="outline-secondary"
              style= {{ height : 40 }} 
              onClick={async () => {
                const consultatii = await this.state.consultatiiFunctions.getConsultatiiByMedic(this.state.searchText);
                this.setState({ consultatii });
              }}
           >
              Cauta
           </Button>
           <Button variant="outline-danger"
              style= {{ height : 40 }} 
              onClick={async () => {
                const consultatii = await this.state.consultatiiFunctions.getConsultatii();
                this.setState({ consultatii });
              }}
           >
              Reseteaza
           </Button>
          </div>
          
           <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "flex-end", marginRight: 10 }}>
           <Dropdown> 
              <Dropdown.Toggle variant="secondary" id="dropdown-button-dark-example1">
                Filtreaza dupa specia animalului
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                {
                  this.state.listaSpecii.map((specie, idx) => (
                    <Dropdown.Item key={idx} 
                      onClick={async () =>{
                        const consultatii = await this.state.consultatiiFunctions.getConsultatiiBySpecie(specie.specie);
                        this.setState({consultatii});
                      }}>
                      {specie.specie}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
           </div>
           
        </div>
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
