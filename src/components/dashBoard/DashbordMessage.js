import Accordion from "react-bootstrap/Accordion";
import RemoveTags from "../UI/RemoveTags";
import RemoveStringCharacters from "../UI/RemoveStringCharacter";
import style from "./DashbordMessage.module.css";

function DashbordMessage({ message }) {
  const content = message.content.rendered;

  console.log(content);
  return (
    <Accordion.Item eventKey={message.id}>
      <Accordion.Header>
        <div className={style.accordion_header}>
          <p>{message.date.split("T")[0]}</p>
          <p className={style.subject}>
            <span className={style.span_header}>Subject: </span>
            <RemoveStringCharacters>
              {message.title.rendered}
            </RemoveStringCharacters>
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>From: {message.slug}</p>
        <div className={style.message}>
          <h5 className="bold">
            <RemoveStringCharacters>
              {message.title.rendered}
            </RemoveStringCharacters>
          </h5>
          <RemoveTags>{content}</RemoveTags>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DashbordMessage;
