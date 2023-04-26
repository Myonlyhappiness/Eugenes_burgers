import ingredientDetailsStyles from "./Ingredient-Details.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails({ item }) {
  return (
    <div className={ingredientDetailsStyles.main}>
      <img src={item.image_large} className={ingredientDetailsStyles.image} />
      <p
        className={`text text_type_main-medium ${ingredientDetailsStyles.name}`}
      >
        {item.name}
      </p>
      <ul className={ingredientDetailsStyles.nutrients}>
        <li className={ingredientDetailsStyles.nutrientsElement}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <br />
          <span className="text text_type_digits-default">{item.calories}</span>
        </li>
        <li className={ingredientDetailsStyles.nutrientsElement}>
          <span className="text text_type_main-default">Белки, г</span>
          <br />
          <span className="text text_type_digits-default">{item.proteins}</span>
        </li>
        <li className={ingredientDetailsStyles.nutrientsElement}>
          <span className="text text_type_main-default">Жиры, г</span>
          <br />
          <span className="text text_type_digits-default">{item.fat}</span>
        </li>
        <li className={ingredientDetailsStyles.nutrientsElement}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <br />
          <span className="text text_type_digits-default">
            {item.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: PropTypes.object.isRequired,
};
