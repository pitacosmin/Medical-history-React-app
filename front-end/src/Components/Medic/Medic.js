import React from "react";
import { Card, Button } from "react-bootstrap";

const Medic = ({ medic }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{medic.nume + " " + medic.prenume}</Card.Title>
          <Card.Text>{medic.specializare}</Card.Text>
          <Button variant="primary">Detalii</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Medic;
