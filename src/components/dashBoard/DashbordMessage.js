import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import style from "./DashbordMessage.module.css";

/**
 * Generates a message item
 * @param {object} message object to extract information from
 * @returns message as an accordion item
 */

function DashbordMessage({ message }) {
  return (
    <Accordion.Item eventKey={message.id}>
      <Accordion.Header>
        <div className={style.accordion_header}>
          <p className={style.date}>{message.date.split("T")[0]}</p>
          <p className={style.subject}>
            <span className={style.span_header}>Subject:</span>
            {message.acf.subject}
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p className={style.fullName}>
          <span>{message.acf.fullName}</span>
        </p>
        <p>From: {message.acf.email}</p>
        <div className={style.message}>
          <h5 className="bold">{message.acf.subject}</h5>
          <p>{message.acf.message}</p>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

DashbordMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default DashbordMessage;
