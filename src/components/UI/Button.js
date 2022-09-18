import React from "react";
import style from "./Button.module.css";

/**
 * Generates a reusable blue button
 * @param {*} props
 * @returns button with custom content depending on children props
 */

function Button(props) {
  return <button className={style.button}>{props.children}</button>;
}

export default Button;
