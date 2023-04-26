import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./Burger-Ingredients.module.css";
import IngredientList from "../Ingredient-List/Ingredient-List";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients() {
  const [bun, scrollToBuns] = useInView({ threshold: 0.1 });
  const [sauce, scrollToSauces] = useInView({ threshold: 0.2 });
  const [main, scrollToMain] = useInView({ threshold: 0.2 });

  const [current, setCurrent] = React.useState("one");
  const { modalActive, currentIngredient } = useSelector(
    (store) => store.modal
  );

  React.useEffect(() => {
    if (scrollToBuns) {
      setCurrent("one");
    } else if (scrollToSauces) {
      setCurrent("two");
    } else if (scrollToMain) {
      setCurrent("three");
    }
  }, [scrollToBuns, scrollToSauces, scrollToMain]);

  return (
    <section className={`mr-10 ${ingredientsStyles.ingredients}`}>
      <div className={`mt-5 ${ingredientsStyles.tabs}`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${ingredientsStyles.ingredientsList}`}>
        <h2 ref={bun} className="text text_type_main-medium">
          Булки
        </h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="bun" />
        </div>
        <h2 ref={sauce} className="text text_type_main-medium">
          Соусы
        </h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="sauce" />
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div
          ref={main}
          className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}
        >
          <IngredientList type="main" />
        </div>
        {modalActive && currentIngredient && (
          <Modal title="Детали ингредиента">
            <IngredientDetails item={currentIngredient} />
          </Modal>
        )}
      </div>
    </section>
  );
}
