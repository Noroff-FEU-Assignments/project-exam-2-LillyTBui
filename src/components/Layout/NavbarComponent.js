import style from "./NavbarComponent.module.css";
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AuthContext, { AuthProvider } from "../../Context/AuthContext";
import NavbarUserLink from "./NavbarUserLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function NavbarComponent() {
  const [auth] = useContext(AuthContext);

  return (
    <header>
      <AuthProvider>
        <Navbar expand="sm" className={style.navbar}>
          <Container>
            <NavLink to="/">
              <Navbar.Brand className={style.title}>Holidaze</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                {auth ? (
                  <>
                    <NavLink to="/contact" className={style.link}>
                      Contact
                    </NavLink>
                    <NavbarUserLink />
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={style.link}>
                      Log in
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className={style.icon}
                      />
                    </NavLink>
                    <NavLink to="/contact" className={style.link}>
                      Contact
                    </NavLink>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </AuthProvider>
    </header>
  );
}

export default NavbarComponent;
