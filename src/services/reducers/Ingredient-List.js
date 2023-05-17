import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/Ingredient-List";

const initialState = {
  ingredients: [],
  itemsRequest: false,
  itemsFailed: false,
  textError: "",
  currentIngredient: null
}


export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        itemsRequest: false,
        ingredients: action.ingredients,
      };
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        textError: action.error,
      };
    }
    
    case OPEN_MODAL: {
      return {
        ...state,
        currentIngredient: action.item ? action.item : null,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: "",
      };
    }

    default: {
      return state;
    }
  }
};
