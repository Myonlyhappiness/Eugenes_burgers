export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

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
