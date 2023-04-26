import ingredientStyles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../../services/actions/Ingredient-List";
import { useDrag } from "react-dnd";

export function Ingredient({ item }) {
  const ingredients = useSelector((store) => store.menu.constructorItems);

  const dispatch = useDispatch();
  const [, ingredientRef] = useDrag({
    type: "items",
    item: item,
  });
  return (
    <article
      ref={ingredientRef}
      className={`pl-4 pr-4 ${ingredientStyles.ingredient}`}
      onClick={() => dispatch({ type: OPEN_MODAL, item })}
    >
      {item.__v > 0 && (
        <Counter count={item.__v} size="small" extraClass="m-1" />
      )}
      <img
        src={item.image}
        className={ingredientStyles.image}
        alt={item.name}
      />
      <p className="text text_type_digits-default mt-1 mb-1">
        {item.price}
        <span className={ingredientStyles.icon}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <p className="text text_type_main-default">{item.name}</p>
    </article>
  );
}


Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
  };