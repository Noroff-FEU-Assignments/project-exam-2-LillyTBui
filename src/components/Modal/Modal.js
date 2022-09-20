import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalContext from "../../Context/Modal-context";
import ModalForm from "./ModalForm";
import style from "./Modal.module.css";
import { ModalFormProvider } from "../../Context/ModelFormContext";

/**
 * Generates a modal component as an enquiry form
 * @param {object} object has name (string) and price (number) values
 * @returns modal enquiry form
 */

function ModalElement({ name, price }) {
  const { show, setShow } = useContext(ModalContext);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalFormProvider>
        <Modal.Header closeButton className={style.modal_header}>
          <Modal.Title>Enquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modal_form}>
          <ModalForm name={name} price={price} />
        </Modal.Body>
        <Modal.Footer className={style.modal_footer}>
          <Button onClick={handleClose} className={style.cancel_btn}>
            Cancel
          </Button>
        </Modal.Footer>
      </ModalFormProvider>
    </Modal>
  );
}

export default ModalElement;
