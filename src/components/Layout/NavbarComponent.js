import style from "./NavbarComponent.module.css";
import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AuthContext, { AuthProvider } from "../../Context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

/**
 * Generates a navbar component
 * @returns navbar component
 */

function NavbarComponent() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    localStorage.setItem("user", null);
    navigate("/");
  }

  function show() {
    document.getElementById("panel").classList.toggle("flex");
  }

  return (
    <header>
      <AuthProvider>
        <Navbar expand="sm" className={style.navbar}>
          <Container>
            <NavLink to="/">
              <Navbar.Brand className={style.title}>Holidaze</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className={style.navbar_collapse}>
              <Nav className="ms-auto">
                {auth ? (
                  <>
                    <NavLink to="/accommodations" className={style.link}>
                      Accommodations
                    </NavLink>
                    <NavLink to="/contact" className={style.link}>
                      Contact
                    </NavLink>
                    <div className={style.accordion}>
                      <button className={style.user_button} onClick={show}>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          className={style.icon}
                        />
                      </button>
                      <div className={style.panel} id="panel">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <button onClick={logout} className={style.logout}>
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink to="/accommodations" className={style.link}>
                      Accommodations
                    </NavLink>
                    <NavLink to="/contact" className={style.link}>
                      Contact
                    </NavLink>
                    <NavLink to="/login" className={style.link}>
                      Log in
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className={style.icon}
                      />
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
