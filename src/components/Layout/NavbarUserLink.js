import style from "./NavbarUserLink.module.css";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Context/AuthContext";

function NavbarUserLink() {
  const [setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  function show() {
    document.getElementById("panel").classList.toggle("flex");
  }

  return (
    <div className={style.accordion}>
      <button className={style.user_button} onClick={show}>
        <FontAwesomeIcon icon={faCircleUser} className={style.icon} />
      </button>
      <div className={style.panel} id="panel">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <button onClick={logout} className={style.logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavbarUserLink;
