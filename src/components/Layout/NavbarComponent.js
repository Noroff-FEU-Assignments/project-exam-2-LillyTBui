import style from "./NavbarComponent.module.css";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function NavbarComponent() {
  return (
    <header>
      <Navbar expand="sm">
        <Container>
          <NavLink to="/">
            <Navbar.Brand className={style.title}>Holidaze</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/login" className={style.link}>
                Log in
                <FontAwesomeIcon icon={faCircleUser} className={style.icon} />
              </NavLink>
              <NavLink to="/contact" className={style.link}>
                Contact
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavbarComponent;
