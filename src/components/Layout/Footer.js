import React from "react";
import style from "./Footer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.text}>
        <FontAwesomeIcon icon={faCopyright} className={style.icon} />
        Holidaze
      </p>
    </footer>
  );
}

export default Footer;
