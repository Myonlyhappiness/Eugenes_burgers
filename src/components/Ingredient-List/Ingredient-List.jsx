import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Ingredient } from "../Ingredient/Ingredient";

export default function IngredientList({ type }) {
  const ingredients = useSelector((store) => store.menu.ingredients);

  return ingredients.map((item) => {
    if (item.type === type) {
      return <Ingredient item={item} key={item._id} />;
    }
  });
}

IngredientList.propTypes = {
  type: PropTypes.string.isRequired,
};
