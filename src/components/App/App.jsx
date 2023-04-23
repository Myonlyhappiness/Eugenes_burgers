import React from "react";
import appStytles from "./App.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import Main from "../Main/Main";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/Ingredient-List'

function App() {
  const dispatch = useDispatch();
  const {ingredients, itemsRequest, itemsFailed, textError} = useSelector(store => store.menu);

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);
  

  return (
    <div className={appStytles.page}>
      <AppHeader />
      <Main>
        {itemsRequest && "Ингредиенты подгружаются"}
        {itemsFailed && textError}
        {!itemsRequest && !itemsFailed && ingredients.length && (
          <>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
