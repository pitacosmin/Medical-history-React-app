import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Serviciu = ({ serviciu, deleteServiciu }) => {
  const history = useHistory();
  
  const goToFormularServicii = () => {
    history.push({
      pathname: "/formularServicii",
      state: {
        serviciuId: serviciu.serviciuId,
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
      <Card style={{ width: "35rem", height: "15rem" }}>
        <Card.Img variant="top" />
        <Card.Header as="h5">{serviciu.tipServiciu}</Card.Header>
        <Card.Body style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center"
        }}>
          <Card.Text>{serviciu.descriere}</Card.Text>
          <div style={{ 
            display: "flex", 
            flexDirection: "row",
          }}>
          <Button variant="primary" style={{ marginLeft: "15px" }}
            onClick={() => {
              goToFormularServicii();
            }}
          >
            Modifica
          </Button>
          <div
            style={{
              marginLeft: "20px"
            }}
          >
            <FaTrash color="grey" size={22} onClick={() => {
              deleteServiciu(serviciu.serviciuId);
            }} />
          </div>
          </div>
          
        </Card.Body>
        <Card.Footer style={{ fontWeight: "bold" }}>{"Pret: " + serviciu.pret + " lei"}</Card.Footer>
      </Card>
    </div>
  );
};

export default Serviciu;
