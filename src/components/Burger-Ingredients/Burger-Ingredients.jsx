import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientsStyles from './Burger-Ingredients.module.css'
import IngredientList from '../Ingredient-List/Ingredient-List'
import Modal from '../Modal/Modal'
import IngredientDetails from "../Ingredient-Details/Ingredient-Details"

export default function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('one')
  const [state, setActive] = React.useState({ active: false, event: null, item: null });

  const handleActiveModal = (event, item) => {
    event.stopPropagation();
    setActive({
      ...state,
      active: !state.active,
      item: item
    });
  }

  return (
    <section className={`mr-10 ${ingredientsStyles.ingredients}`}>
      <div className={`mt-5 ${ingredientsStyles.tabs}`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${ingredientsStyles.ingredientsList}`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="bun" ingredients={ingredients} handler={handleActiveModal} />
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="sauce" ingredients={ingredients} handler={handleActiveModal} />
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={`pl-4 pt-6 pb-10 ${ingredientsStyles.wrapper}`}>
          <IngredientList type="main" ingredients={ingredients} handler={handleActiveModal} />
        </div>
        {state.active && <Modal {...state} handler={handleActiveModal} title="Детали ингредиента">
          <IngredientDetails item={state.item} />
        </Modal>
        }
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array
}