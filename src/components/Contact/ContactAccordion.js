import Accordion from "react-bootstrap/Accordion";
import style from "./ContactAccordion.module.css";

/**
 * Generates a static Q&A section
 * @returns Q&A section with accordions
 */

function ContactAccordion() {
  return (
    <div className={style.accordion__div}>
      <h2 className={style.accordion__title}>Q&A</h2>
      <Accordion className={style.accordion}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={style.accordion__header}>
            How to make a reservation?
          </Accordion.Header>
          <Accordion.Body className={style.accordion__body}>
            Find an accommodation you like and make an enquiry by filling out
            when you want to stay and your contact details. You will get a
            confirmation from the host if you can stay at their accommodation.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to cancel a reservation?</Accordion.Header>
          <Accordion.Body className={style.accordion__body}>
            To cancel your reservation click on "cancel my reservation" in your
            confirmation email, and follow the instructions.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            I want to add an extra person to my reservation
          </Accordion.Header>
          <Accordion.Body className={style.accordion__body}>
            To add an extra person to your reservation you need to send a
            request to the host. You can send a request to the host by clicking
            on "send message" and write your enquiry. If the request is accepted
            you will get an invoice with the remaining payment fees and a new
            confirmation email.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Where can I park my car?</Accordion.Header>
          <Accordion.Body className={style.accordion__body}>
            Some accommodations do not have their own parking lots for guests.
            You can check if your desired accommodation has a parking lot by
            going to their details page and look at their "facilities" section.
            If you do not see parking lot under "facilities", the accommodation
            do not offer parking lot.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Can I bring my dog?</Accordion.Header>
          <Accordion.Body className={style.accordion__body}>
            Some accommodations allow pets. You can see which accommodations
            allow pets by going to their details page and look at the
            "facilities" section. Accommodations which allow pets have "pets
            allowed" under "facilities".
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ContactAccordion;
