import React from "react";
import style from "./Content.module.css";

function Content(props) {
  return <div className={style.content}>{props.children}</div>;
}

export default Content;
