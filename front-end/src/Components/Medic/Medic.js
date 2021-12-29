import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Medic = ({ medic, deleteMedic, goToInformatiiMedic }) => {
  const goToFormularMedici = () => {
    this.props.history.push({
      pathname: "/formularMedici",
      state: { idMedic: medic.id },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "20rem", height: "10rem" }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{medic.nume + " " + medic.prenume}</Card.Title>
          <Card.Text>{medic.specializare}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              goToInformatiiMedic(medic.medicId);
            }}
          >
            Detalii
          </Button>
          <Button variant="primary" style={{ marginLeft: "15px" }}>
            Modifica
          </Button>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
            }}
          >
            <FaTrash onClick={() => deleteMedic(medic.medicId)} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Medic;
