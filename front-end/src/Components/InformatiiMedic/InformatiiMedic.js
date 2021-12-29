import React, { useEffect, useState } from "react";
import MediciFunctions from "../../functions/mediciFunctions";

const InformatiiMedic = (props) => {
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
      setConsultatiiAndServicii([...consultatiiAndServicii.data]);
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
        {consultatiiAndServicii.map((value, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p>Data consultatie: {value.data}</p>
            <p>Tip serviciu: {value.tipServiciu}</p>
            <p>Descriere: {value.descriere}</p>
            <p>Pret: {value.pret} lei</p>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default InformatiiMedic;
