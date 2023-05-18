export const GET_INFO_ORDER_REQUEST = "GET_INFO_ORDER_REQUEST";
export const GET_INFO_ORDER_FAILED = "GET_INFO_ORDER_FAILED";
export const GET_INFO_ORDER_SUCCESS = "GET_INFO_ORDER_SUCCESS";
export const CLEAR_INFO_ORDER = 'CLEAR_INFO_ORDER';
export const ORDER_ITEMS = 'ORDER_ITEMS';


export function createOrder(ingredientsID) {
  return function (dispatch) {
    dispatch({
      type: GET_INFO_ORDER_REQUEST,
    });

    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        authorization: "d9e55aed-7d90-42ef-807f-b764eb7d2a2e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsID,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
      )
      .then((res) => {
        dispatch({
          type: GET_INFO_ORDER_SUCCESS,
          orderInfo: res.order,
        }) }
      ) 
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_INFO_ORDER_FAILED,
          error,
        });
      });
  };
}
