import React from "react";
import appStytles from "./App.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import Main from "../Main/Main";

function App() {
  const [state, setState] = React.useState({
    data: [],
    isLoading: false,
    hasError: false,
    textError: null
  });

  React.useEffect(() => {
    getIngredient();
  }, []);
  const getIngredient = () => {
    setState({ ...state, hasError: false, isLoading: true });
    const ingredientsData = "https://norma.nomoreparties.space/api/ingredients";
    fetch(ingredientsData)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
      .then(data => setState({ ...state, ...data, isLoading: false }))
      .catch(error => {
        console.log(error);
        setState({ ...state, hasError: true, textError: error, isLoading: false });
      });
  };

  const { data, isLoading, textError, hasError } = state;

  return (
    <div className={appStytles.page}>
      <AppHeader />
      <Main>
        {isLoading && "Ингредиенты подгружаются"}
        {hasError && textError}
        {!isLoading && !hasError && data.length && (
          <>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
