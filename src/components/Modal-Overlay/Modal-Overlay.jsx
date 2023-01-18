import PropTypes from 'prop-types';
import style from "./Modal-Overlay.module.css";

export default function ModalOverlay({ handler }) {
    return (
        <div className={style.overlay} onClick={handler}></div>
    )
}

ModalOverlay.propTypes = {
    handler: PropTypes.func.isRequired,
}