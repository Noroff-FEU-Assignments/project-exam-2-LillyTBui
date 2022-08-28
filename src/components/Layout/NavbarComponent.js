import style from "./NavbarComponent.module.css";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function NavbarComponent() {
  return (
    <header>
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand href="#home" className={style.title}>
            Holidaze
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#login" className={style.link}>
                Log in
                <FontAwesomeIcon icon={faCircleUser} className={style.icon} />
              </Nav.Link>
              <Nav.Link href="#contact" className={style.link}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavbarComponent;
