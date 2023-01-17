import React from 'react';
import './App.css';
import AppHeader from '../App-Header/App-Header';
import BurgerIngredients from '../Burger-Ingredients/Burger-Ingredients';
import BurgerConstructor from '../Burger-Constructor/Burger-Constructor';
import Main from '../Main/Main'


function App() {

  const [state, setState] = React.useState({ 
    data: [],
    isLoading: false,
    hasError: false
  })


  React.useEffect(() => {getIngredient()}, [])
  const getIngredient = () => {
    setState({ ...state, hasError: false, isLoading: true });
    const ingredientsData = 'https://norma.nomoreparties.space/api/ingredients'
    fetch(ingredientsData)
      .then(res => res.json())
      .then(data => setState({ ...state, ...data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false })
      });
  }

  const {data, isLoading, hasError} = state

  return (
    <div className='page'>
     <AppHeader/>
     <Main>
      {isLoading && 'Ингредиенты подгружаются'}
      {hasError && 'Ошибочка вышла'}
      {!isLoading &&
          !hasError &&
          data.length &&
          <>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data}/>
          </>
          }
     </Main>
     </div>
   );
}

export default App;
