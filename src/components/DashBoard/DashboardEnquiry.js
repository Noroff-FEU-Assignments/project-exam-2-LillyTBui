import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import style from "./DashboardEnquiry.module.css";

/**
 * Generates a single enquiry item
 * @param {object} enquiry object with all information
 * @returns one enquiry
 */

function DashboardEnquiry({ enquiry }) {
  return (
    <Accordion.Item eventKey={enquiry.id}>
      <Accordion.Header>
        <div className={style.accordion_header}>
          <p className={style.date}>{enquiry.date.split("T")[0]}</p>
          <p className={style.name}>{enquiry.title.rendered}</p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div>
          <p className={style.bookingReference}>
            <span className={style.span_container}>Booking reference:</span>{" "}
            {enquiry.acf.bookingReference}
          </p>
          <p>
            <span className={style.span_container}>First Name:</span>
            {enquiry.acf.firstName}
          </p>
          <p>
            <span className={style.span_container}>Last Name:</span>
            {enquiry.acf.lastName}
          </p>
          <p>
            <span className={style.span_container}>Email:</span>
            {enquiry.acf.email}
          </p>
          <p>
            <span className={style.span_container}>Phone number: </span>
            {enquiry.acf.number}
          </p>
        </div>
        <div>
          <p className={style.trip_details}>Trip details</p>
          <p>Total Travelers: {enquiry.acf.travelers}</p>
          <p>Check-in: {enquiry.acf.startDate}</p>
          <p>Check-out: {enquiry.acf.endDate}</p>
          <p>
            <span className={style.span_container}>Total Price:</span>
            {enquiry.acf.price},-
          </p>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

DashboardEnquiry.propTypes = {
  enquiry: PropTypes.object.isRequired,
};

export default DashboardEnquiry;
