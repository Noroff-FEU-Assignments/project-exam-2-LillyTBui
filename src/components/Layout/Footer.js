import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

/**
 * Generates a footer
 * @returns footer
 */

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
