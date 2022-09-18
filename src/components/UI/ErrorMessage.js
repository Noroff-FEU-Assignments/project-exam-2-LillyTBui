import style from "./ErrorMessage.module.css";

/**
 * Generates a reusable error message
 * @param {*} props
 * @returns error message with custom content depending on children props
 */

function ErrorMessage(props) {
  return <div className={style.error}>{props.children}</div>;
}

export default ErrorMessage;
