import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./EnquiryReceived.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

/**
 * Generates an enquiry received page
 * @returns received message and booking details
 */

function EnquiryReceived() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container className={style.received_container}>
      <div className={style.received_title}>
        <FontAwesomeIcon icon={faCircleCheck} className={style.icon} />
        <h1>Booking Received</h1>
        <p>
          We have received your enquiry and you will get an email when the
          booking is confirmed.
        </p>
      </div>
      <div>
        <h2 className={style.booking_title}>Booking Details</h2>
        <div className={style.booking_reference}>
          <p>Booking Reference</p>
          <p>{state.enquiry.acf.bookingReference}</p>
        </div>
        <div className={style.booking_info}>
          <p>
            <span>First Name:</span> {state.enquiry.acf.firstName}
          </p>
          <p>
            <span>Last Name:</span> {state.enquiry.acf.lastName}
          </p>
          <p>
            <span>Email:</span> {state.enquiry.acf.email}
          </p>
          <p>
            <span>Telephone number:</span> {state.enquiry.acf.number}
          </p>
        </div>
        <div className={style.booking_summary}>
          <h3>Booking Summary</h3>
          <p>Accommodation name: {state.enquiry.title.rendered}</p>
          <p>Check-in: {state.enquiry.acf.startDate}</p>
          <p>Check-out: {state.enquiry.acf.endDate}</p>
          <p>Number of travelers: {state.enquiry.acf.travelers}</p>
          <p>
            <span>Total Price:</span> {state.enquiry.acf.price},-
          </p>
        </div>
      </div>
      <button onClick={handleClick} className={style.back_btn}>
        Back to homepage
      </button>
    </Container>
  );
}

export default EnquiryReceived;
