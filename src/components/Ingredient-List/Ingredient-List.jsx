import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Ingredient } from "../Ingredient/Ingredient";

export default function IngredientList({ type }) {
  const getIngredients = (store) => store.menu.ingredients
  const burgerConstructor = (store) => store.burgerConstructor;
  const ingredients = useSelector(getIngredients);
  const {constructorIngredients, constructorBuns} = useSelector(burgerConstructor);
  
  const ingredientsQuantity = React.useMemo(() => {
    const quantity = {};
    constructorIngredients.forEach((item) => {
      !quantity[item._id] ? quantity[item._id] = 1 : quantity[item._id]++ 
    })

    if (constructorBuns) { 
      quantity[constructorBuns._id] = 2
     } 
     return quantity;

  }, [constructorIngredients, constructorBuns])

  return ingredients.map((item) => {
    if (item.type === type) {
      return <Ingredient item={item} key={item._id} quantity={ingredientsQuantity[item._id]} />;
    }
  });
}

IngredientList.propTypes = {
  type: PropTypes.string.isRequired,
};
