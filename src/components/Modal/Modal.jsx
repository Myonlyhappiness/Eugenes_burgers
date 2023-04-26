import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../Modal-Overlay/Modal-Overlay";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/Ingredient-List";
const modalRoot = document.getElementById("modal-root");

export default function Modal({ children, title }) {
  const dispatch = useDispatch();
  const closeModal = (event) => dispatch({ type: CLOSE_MODAL, event });

  React.useEffect(() => {
    const closeByKey = (event) => {
      event.key === "Escape" && closeModal(event);
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalContent}>
        <div className={modalStyles.header}>
          <p className="text text_type_main-large">{title}</p>
          <div className={modalStyles.icon} onClick={closeModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
