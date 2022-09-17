import Accordion from "react-bootstrap/Accordion";
import RemoveTags from "../UI/RemoveTags";
import style from "./DashbordMessage.module.css";

function DashbordMessage({ message }) {
  return (
    <Accordion.Item eventKey={message.id}>
      <Accordion.Header>
        <div className={style.accordion_header}>
          <p>{message.date_created.split("T")[0]}</p>
          <p className={style.subject}>
            <span className={style.span_header}>Subject: </span>
            {message.name}
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <span>From:</span> {message.attributes[0].options[0]}
        </p>
        <p>
          <span>Email:</span> {message.attributes[1].options[0]}
        </p>
        <div className={style.message}>
          <h5 className="bold">{message.name}</h5>
          <RemoveTags>{message.description}</RemoveTags>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DashbordMessage;
