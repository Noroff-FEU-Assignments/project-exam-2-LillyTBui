import React from "react";
import style from "./Content.module.css";
/**
 * Generates a simple container for content
 * @param {*} props
 * @returns container with props children inside
 */

function Content(props) {
  return <div className={style.content}>{props.children}</div>;
}

export default Content;
