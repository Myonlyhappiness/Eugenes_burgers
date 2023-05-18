import PropTypes from "prop-types";
import style from "./Modal-Overlay.module.css";

export default function ModalOverlay({closeModal}) {

  return (
    <div className={style.overlay} onClick={(event) => closeModal(event)}></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};