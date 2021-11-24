import React, { useEffect, useState } from "react";
import MediciFunctions from "../../functions/mediciFunctions";

const InformatiiMedic = (props) => {
  const [medic, setMedic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const functions = new MediciFunctions();
      const medicResponse = await functions.findMedicById(
        props.location.state.medicId
      );
      const medicData = medicResponse.data;
      setMedic(medicData);
    };
    fetchData();
  }, []);

  // Nume: Nume
  // Prenume: Prenume
  // Specializare:

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
          height: "100vh",
        }}
      >
        Consultatii
      </div>
    </div>
  ) : null;
};

export default InformatiiMedic;
