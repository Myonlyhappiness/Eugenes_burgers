import PropTypes from "prop-types";
import style from "./Modal-Overlay.module.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/Ingredient-List";

export default function ModalOverlay() {
  const dispatch = useDispatch();
  const closeModal = (event) => dispatch({ type: CLOSE_MODAL, event });
  return (
    <div className={style.overlay} onClick={(event) => closeModal(event)}></div>
  );
}
