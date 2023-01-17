import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
const modalRoot = document.getElementById("modal-root");

export default function Modal({active, event, handler, children}) {
  const closeByKey = (event) => {
    event.key === "Escape" && handler(event)};

  React.useEffect(() => {
        document.addEventListener("keydown", closeByKey);
    
        return () => {
          document.removeEventListener("keydown", closeByKey);
        };
      },[active]);


    return ReactDOM.createPortal(
        <div className={modalStyles.modal}>
        <div className={modalStyles.modalContent}>
            <div className={modalStyles.header}>
                <p className="text text_type_main-large">{event.className.includes('ingredient') && "Детали ингредиента"}
                </p>
                <div className={modalStyles.icon} onClick={handler}><CloseIcon type="primary" /></div>
            </div>
            {children}
        </div>
        <ModalOverlay handler={handler}/>
    </div>
, modalRoot)   
}

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    event: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
    children: PropTypes.element
  }

