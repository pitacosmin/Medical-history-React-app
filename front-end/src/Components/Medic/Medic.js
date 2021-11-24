import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Medic = ({ medic, deleteMedic, goToInformatiiMedic }) => {
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
