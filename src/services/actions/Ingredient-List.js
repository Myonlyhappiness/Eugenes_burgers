export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_BUN = "DELETE_BUN";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";
export const INCREASE_COUNTER_BUN = "INCREASE_COUNTER_BUN";
export const DECREASE_COUNTER_BUN = "DECREASE_COUNTER_BUN";
export const MOVING_ITEM = "MOVING_ITEM";
export const CLEAR_CART = 'CLEAR_CART';
export const RESET_COUNTERS = 'RESET_COUNTERS';

export const addIngredient = (payload) => ({ type: ADD_ITEM, payload });

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });

    fetch("https://norma.nomoreparties.space/api/ingredients", {
      method: "GET",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
      )
      .then((res) =>
        dispatch({
          type: GET_ITEMS_SUCCESS,
          ingredients: res.data,
        })
      )
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_ITEMS_FAILED,
          error,
        });
      });
  };
}
