import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Medici from "./Medici";
import Consultatii from "./Consultatii";
import FormularMedici from "./FormularMedici/FormularMedici";
import InformatiiMedic from "./InformatiiMedic/InformatiiMedic";

const NavbarComponent = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Medici
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/consultatii"}>
                Consultatii
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Medici} />
        <Route exact path="/consultatii" component={Consultatii} />
        <Route exact path="/informatiiMedic" component={InformatiiMedic} />
        <Route exact path="/formularMedici" component={FormularMedici} />
      </Switch>
    </Router>
  );
};

export default NavbarComponent;
