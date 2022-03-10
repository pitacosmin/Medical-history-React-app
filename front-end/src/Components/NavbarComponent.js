import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Medici from "./Medici";
import Consultatii from "./Consultatii";
import FormularMedici from "./FormularMedici/FormularMedici";
import InformatiiMedic from "./InformatiiMedic/InformatiiMedic";
import Servicii from "./Servicii";
import FormularServicii from "./FormularServicii/FomularServicii";
import Animale from "./Animale";
import InformatiiProprietar from "./InformatiiProprietar/InformatiiProprietar";
import FiseMedicale from "./FiseMedicale";

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
              <Nav.Link as={Link} to={"/servicii"}>
                Servicii
              </Nav.Link>
              <Nav.Link as={Link} to={"/animale"}>
                Animale
              </Nav.Link><Nav.Link as={Link} to={"/fisemedicale"}>
                Fise medicale
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Medici} />
        <Route exact path="/consultatii" component={Consultatii} />
        <Route exact path="/servicii" component={Servicii} />
        <Route exact path="/animale" component={Animale} />
        <Route exact path="/informatiiMedic" component={InformatiiMedic} />
        <Route exact path="/informatiiProprietar/:id" component={InformatiiProprietar} />
        <Route exact path="/formularMedici" component={FormularMedici} />
        <Route exact path="/formularServicii" component={FormularServicii} />
        <Route exact path="/fiseMedicale" component={FiseMedicale} />
      </Switch>
    </Router>
  );
};

export default NavbarComponent;
