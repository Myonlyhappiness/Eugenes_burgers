import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../Modal-Overlay/Modal-Overlay'
const modalRoot = document.getElementById("modal-root");

export default function Modal({handler, children, title}) {

    React.useEffect(() => {
        const closeByKey = (event) => {
            event.key === "Escape" && handler(event)
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
                    <p className="text text_type_main-large">{title}
                    </p>
                    <div className={modalStyles.icon} onClick={handler}><CloseIcon type="primary" /></div>
                </div>
                {children}
            </div>
            <ModalOverlay handler={handler} />
        </div>
        , modalRoot)
}

Modal.propTypes = {
    handler: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.element
}

