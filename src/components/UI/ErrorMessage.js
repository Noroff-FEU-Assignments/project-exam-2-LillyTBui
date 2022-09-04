import React from "react";
import style from "./ErrorMessage.module.css";

function ErrorMessage(props) {
  return <div className={style.error}>{props.children}</div>;
}

export default ErrorMessage;
