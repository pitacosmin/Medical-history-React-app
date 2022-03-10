import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import MediciFunctions from "../../functions/mediciFunctions";

const InformatiiMedic = (props) => {
  const mediciFunctions = new MediciFunctions();
  const [medic, setMedic] = useState(null);
  const [consultatiiAndServicii, setConsultatiiAndServicii] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const functions = new MediciFunctions();
      const medicResponse = await functions.findMedicById(
        props.location.state.medicId
      );
      const consultatiiAndServicii =
        await functions.getConsultatiiAndServiciiForMedic(
          props.location.state.medicId
        );
      setConsultatiiAndServicii([...consultatiiAndServicii]);
      const medicData = medicResponse.data[0];
      setMedic(medicData);
    };
    fetchData();
  }, []);

  return medic ? (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        width:"200vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#2d3238", // #2d3238 #212529
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "40px",
          }}
        >
          <p style={{ fontSize: "30px" }}>{medic.nume}</p>
          <p style={{ fontSize: "30px" }}>{medic.prenume}</p>
          <p>Specializare: {medic.specializare}</p>
          <p>Data nasterii: {medic.dataNasterii}</p>
          <p>Sex: {medic.sex === "F" ? "Feminin" : "Masculin"}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 3,
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100vh",
          marginLeft: "12px",
        }}
      >
        <h1
          style={{
            textWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Consultatii
        </h1>
          <Button variant="secondary" onClick={async () => {
              const newconsultatii = await mediciFunctions.getConsultatiiForMedicByPret(props.location.state.medicId);
              setConsultatiiAndServicii(newconsultatii.data);
          }}>
             Afisati consultatiile cu pret {'>'} media preturilor 
          </Button>
          <div style={{marginTop: 10}}>
            <Button variant="secondary" onClick={async () => {
                const newconsultatii = await mediciFunctions.getConsultatiiForMedicByYear(props.location.state.medicId);
                setConsultatiiAndServicii(newconsultatii.data);
            }}>
              Afisati doar consultatiile din cel mai recent an (descrescator)
            </Button>
          </div>
          <div style={{marginTop: 10}}>
            <Button variant="danger" onClick={async () => {
                const consultatii = await mediciFunctions.getConsultatiiAndServiciiForMedic(props.location.state.medicId);
                setConsultatiiAndServicii(consultatii);
            }}>
              Reseteaza
            </Button>
          </div>
          
          <Table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tip serviciu</th>
                    <th>Descriere</th>
                    <th>Pret</th>
                  </tr>
                </thead>
                <tbody>
                {consultatiiAndServicii.map((value, idx) => (
                <tr key={idx}>
                  <td>{value.data}</td>
                  <td>{value.tipServiciu}</td>
                  <td>{value.descriere}</td>
                  <td>{value.pret} lei</td>
                </tr>
                ))}
                </tbody>
          </Table>
      </div>
    </div>
  ) : null;
};

export default InformatiiMedic;
