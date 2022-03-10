import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Medic = ({ medic, deleteMedic }) => {
  const history = useHistory();
  
  const goToFormularMedici = () => {
    history.push({
      pathname: "/formularMedici",
      state: {
        medicId: medic.medicId,
      },
    });
  };

  const goToInformatiiMedic = () => {
    history.push({
      pathname: "/informatiiMedic",
      state: {
        medicId: medic.medicId,
      },
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
          <Card.Text>{"Specializare: " + medic.specializare}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              goToInformatiiMedic();
            }}
          >
            Detalii
          </Button>
          <Button variant="primary" style={{ marginLeft: "15px" }}
            onClick={() => {
              goToFormularMedici();
            }}
          >
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
