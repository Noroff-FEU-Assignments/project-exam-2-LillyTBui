import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalContext from "../../Context/Modal-context";
import ModalTripForm from "./ModalTripForm";
import ModalForm from "./ModalForm";
import CustomButton from "../UI/Button";

import style from "./Modal.module.css";

function ModalElement({ price }) {
  const { show, setShow } = useContext(ModalContext);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className={style.modal_header}>
        <Modal.Title>Enquiry Form</Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.modal_form}>
        <ModalTripForm price={price} />
        <ModalForm />
      </Modal.Body>
      <Modal.Footer className={style.modal_footer}>
        <Button onClick={handleClose} className={style.cancel_btn}>
          Cancel
        </Button>
        <CustomButton onClick={handleClose}>Send</CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalElement;
