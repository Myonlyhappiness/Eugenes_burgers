import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./Burger-Ingredients.module.css";
import IngredientList from "../Ingredient-List/Ingredient-List";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients() {
  const menu = (store) => store.menu;
  const container = React.useRef(null);
  const [bun, scrollToBuns, bunElement] = useInView({ threshold: 0, root: container.current});
  const [sauce, scrollToSauces, sauceElement] = useInView({ threshold: 0, root: container.current});
  const [main, scrollToMain, mainElement] = useInView({threshold: 0.5, root: container.current});
  const [current, setCurrent] = React.useState("one");
  const {currentIngredient} = useSelector(menu);
  

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
        <Tab value="one" active={current === "one"} onClick={() => {
          setCurrent("one");
          bunElement.target.scrollIntoView({ behavior: "smooth"});
          }}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={() => {
          setCurrent("two");
          sauceElement.target.scrollIntoView({ behavior: "smooth"});
          }}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={() => {
          setCurrent("three");
          mainElement.target.scrollIntoView({ behavior: "smooth"});
          }}>
          Начинки
        </Tab>
      </div>
      <div ref={container} className={`mt-10 ${ingredientsStyles.ingredientsList}`}>
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
        <h2 ref={main} className="text text_type_main-medium">Начинки</h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="main" />
        </div>
        {currentIngredient && (
          <Modal title="Детали ингредиента" type="ingredient">
            <IngredientDetails item={currentIngredient} />
          </Modal>
        )}
      </div>
    </section>
  );
}
